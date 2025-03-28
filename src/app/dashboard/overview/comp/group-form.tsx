"use client"

import type { ClassName, DualIcon } from "@/app/types";
import { cn } from "@/lib/utils";
import { ButtSqx } from "@/ui/button/button";
import { FlexRow } from "@/ui/flex";
import { FastField, type InputProps } from "@/ui/input";
import { HyperList } from "@/ui/list";
import { SideVaul } from "@/ui/sidevaul";
import { FlatWindow } from "@/ui/window";
import { SpToolbar, type StaticToolbarProps, type ToolbarProps } from "@/ui/window/toolbar";
import { BuildingOfficeIcon, EnvelopeIcon, MapIcon, MapPinIcon, PhoneIcon, PuzzlePieceIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { BuildingOffice2Icon, MapPinIcon as MapPin } from "@heroicons/react/24/solid";
import { Image } from "@nextui-org/react";
import { type ChangeEvent, type FC, type FocusEvent, useActionState, useCallback, useMemo } from "react";
import { create } from "zustand";
import { useGroup } from "../../hooks/useGroup";
import { BasicAction } from "./actions";
import { ButtSex } from "@/ui/button/ripple";
import { z } from "zod";
import { Icon } from "@/lib/icon";
import { useMutation } from "convex/react";
import { api } from "@vex/api";
import { type InsertGroup, type SelectGroup } from "@convex/groups/d";
import { useAuthCtx } from "@/app/ctx/auth/auth";
import { Err, guid } from "@/utils/helpers";
import { onSuccess } from "@/app/ctx/toasts";

export const CreateGroup = () => {
  const {user} = useAuthCtx()
  const { open, toggle } = useGroup();
  const handleCreate = useCallback(() => {
    if (!open) {
      toggle();
    }
  }, [toggle, open]);

  const {
    group_name,
    group_code,
    group_logo_url,
    manager_name,
    manager_email,
    manager_phone,
    groupFields,
    location,
    address,
    setGroupName,
    setGroupCode,
    setGroupLogoUrl,
    setGroupManagerName,
    setGroupManagerEmail,
    setGroupManagerPhone,
    setLocation,
    setAddress
  } = useGroupStore();

  const Toolbar = useCallback(() => {
    return (
      <ToolbarComponent
        title={group_name}
        closeFn={toggle}
        icon="settings-01"
        variant="goddess"
        v={{ manager_name, manager_email, manager_phone, group_logo_url, location, address }}
      />
    );
  }, [toggle, group_name, manager_name, manager_email, manager_phone, group_logo_url, location, address]);

  const onChangeFn = useCallback((setFn: (value: string) => void) => (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFn(e.target.name === "group_code" ? String(e.target.value).toUpperCase() : e.target.value);
  }, []);

  const onBlur = useCallback(() => (e: FocusEvent<HTMLInputElement>) => {
    e.preventDefault();
    const storedData = localStorage.getItem("fastinsure--group-fields");
    const currentData = storedData ? JSON.parse(storedData) as GroupField : {};
    const updatedData = {
      ...currentData,
      [e.target.name]: e.target.value
    };
    localStorage.setItem("fastinsure--group-fields", JSON.stringify(updatedData));
  }, []);

  const group_fields: GroupFields[] = useMemo(() => [
    {
      name: "group_name",
      label: "Group Name",
      required: true,
      description: "Name of the Group, Branch, or Office.",
      placeholder: "Group name",
      icon: BuildingOfficeIcon,
      defaultValue: group_name,
      onChange: onChangeFn(setGroupName),
      onBlur
    },
    {
      name: "group_code",
      label: "Group Code",
      required: true,
      description: "Code identifier for the group.",
      placeholder: "Group code",
      icon: PuzzlePieceIcon,
      defaultValue: group_code,
      onChange: onChangeFn(setGroupCode),
      onBlur
    },
    {
      name: "manager_name",
      label: "Manager's Name",
      required: true,
      description: "Group Manager's Name.",
      placeholder: "Manager's Name",
      icon: UserCircleIcon,
      defaultValue: manager_name,
      onChange: onChangeFn(setGroupManagerName),
      onBlur
    },
    {
      name: "manager_email",
      label: "Manager's Email",
      required: true,
      description: "Group Manager's Email.",
      placeholder: "Manager's Email",
      icon: EnvelopeIcon,
      defaultValue: manager_email,
      onChange: onChangeFn(setGroupManagerEmail),
      onBlur
    },
    {
      name: "manager_phone",
      label: "Manager's Phone",
      description: "Group Manager's Phone.",
      placeholder: "Manager's Phone",
      icon: PhoneIcon,
      defaultValue: manager_phone,
      onChange: onChangeFn(setGroupManagerPhone),
      onBlur
    },
    {
      name: "groupLocation",
      label: "Location",
      required: true,
      description: "Location identifier for the group. eg. Subic Branch",
      placeholder: "Location",
      icon: MapPinIcon,
      defaultValue: location,
      onChange: onChangeFn(setLocation),
      onBlur
    },
    {
      name: "groupAddress",
      label: "Complete Address",
      description: "Group's office address.",
      placeholder: "Address",
      icon: MapIcon,
      defaultValue: address,
      onChange: onChangeFn(setAddress),
      onBlur
    },
    {
      name: "group_logoUrl",
      label: "Group Logo",
      description: "Group's office address.",
      placeholder: "Logo",
      icon: MapIcon,
      type: "file",
      required: false,
      defaultValue: group_logo_url,
      onChange: onChangeFn(setGroupLogoUrl),
      onBlur
    },
  ], [group_name, group_code, group_logo_url, onChangeFn, setGroupName, setGroupCode, setGroupLogoUrl, onBlur, setGroupManagerPhone, setLocation, setAddress, address, manager_phone, manager_email, manager_name, location, setGroupManagerName, setGroupManagerEmail])


  return (
    <BasicAction
      title="Create New Group"
      subtext="New Group / Branch"
      icon="group"
      fn={handleCreate}
      label="create"
      loading={false}
    >
      <NewGroupWindow userId={user?.uid} open={open} toggle={toggle} toolbar={Toolbar} data={group_fields} initialState={groupFields} />
    </BasicAction>
  );
};

interface NewGroupWindowProps {
  userId: string | undefined;
  open: boolean;
  toggle: () => void;
  toolbar: FC<StaticToolbarProps>;
  data: GroupFields[]
  initialState: Partial<GroupField>
}

const NewGroupWindow = ({ userId, open, toggle, data, toolbar, initialState }: NewGroupWindowProps) => {
  const create = useMutation(api.groups.create.default);
  const createGroup = useCallback(async (params: InsertGroup) => {
    if (!userId) {
      console.error("Reauthentication required.");
      return null;
    }
    await create(params).then(() => {
      onSuccess("Group created successfully!")
      localStorage.removeItem("fastinsure--group-fields");
      toggle()
    });

  }, [userId, create, toggle]);

  const handleCreateGroup = useCallback((initialState: Partial<SelectGroup | null>, fd: FormData) => {
    try {
      // Create a properly typed object from FormData
      const formData: Partial<SelectGroup> = {
        group_name: fd.get("group_name") as string,
        group_code: fd.get("group_code") as string,
        // group_logo_url: fd.get("group_logoUrl") as string,
        manager_name: fd.get("manager_name") as string,
        manager_email: fd.get("manager_email") as string,
        manager_phone: fd.get("manager_phone") as string,
        location: fd.get("groupLocation") as string,
        address: fd.get("groupAddress") as string,
      };

      const validation = GroupFieldSchema.safeParse(formData);

      if (!validation.success) {
        console.error(validation.error.message);
        return null
      }

      // Store validated data in localStorage
      //
      if (!userId) {
        console.error("User ID is missing");
        return null;
      }

      createGroup({id: userId, data: {...validation.data, group_id: guid()}}).catch(Err)


      // toggle();
      // console.table(validation.data);
      return validation.data

    } catch (error) {
      console.error(error instanceof Error ? error.message : 'Failed to create group');
      return null
    }
  }, [createGroup, userId]);

  const [, action, pending] = useActionState(handleCreateGroup, initialState);

  return (
    <SideVaul open={open} onOpenChange={toggle} direction="right" dismissible={false}>
      <FlatWindow title={"New Group"} variant="goddess" toolbar={toolbar}>
        <form action={action}>
        <SideVaul.Body>
          <div className="flex h-[34rem] w-[28rem] flex-col relative">
            <div className="p-2 font-semibold z-50 tracking-tight w-full text-macd-blue bg-god/20 border-b-[0.33px] border-primary/10 absolute backdrop-blur-md space-x-2">
              <span>●</span><span>New Group Form</span>
            </div>
            <HyperList container="py-12" data={data} keyId="name" component={GroupFieldItem} itemStyle="py-3" />
          </div>
        </SideVaul.Body>
        <SideVaul.Footer variant="goddess">
          <div className="flex w-full justify-end space-x-1.5">
            <ButtSex onClick={toggle}>Cancel</ButtSex>
            <ButtSex type="submit" inverted disabled={pending} className="w-fit">
              {pending ? 'Creating...' : <div className="flex space-x-2 items-center"><span>Create Group</span><Icon name="add-circle-fill" className="size-4" /></div>}
            </ButtSex>
          </div>
        </SideVaul.Footer>
        </form>
      </FlatWindow>
    </SideVaul>
  );
};

interface GroupFields extends InputProps {
  description: string;
  label: string;
  icon: DualIcon;
  className?: ClassName;
  defaultValue?: string;
}

const GroupFieldItem = ({ name, defaultValue, onChange, onBlur, label, description, icon, required, placeholder, className }: GroupFields) => {
  return (
    <div className="space-y-1">
      <div className="text-sm font-medium tracking-tight ps-3">{label} <span className="text-macl-red text-lg ps-1">{required && "*"}</span></div>
      <div className="text-xs ps-3 opacity-60">{description}</div>
      <FastField icon={icon} name={name} defaultValue={defaultValue} onChange={onChange} onBlur={onBlur} required={required} placeholder={placeholder} className={cn("border-b-[0.33px] border-gray-400/60", { "uppercase": name === "group_code" }, className)} />
    </div>
  );
};


const GroupFieldSchema = z.object({
  group_name: z.string().min(2).max(100),
  group_code: z.string().min(2).max(100),
  manager_name: z.string().min(2).max(100),
  manager_email: z.string().email().min(2).max(100),
  manager_phone: z.string().min(2).max(100),
  group_logo_url: z.string().url().optional(),
  location: z.string().min(2).max(100),
  address: z.string().min(2).max(100),
});
type GroupField = z.infer<typeof GroupFieldSchema>;

interface GroupStore extends GroupField {
  groupFields: Partial<GroupField>;
  setGroupField: (fields: GroupField) => void
  setGroupName: (group_name: string) => void;
  setGroupCode: (group_code: string) => void;
  setGroupLogoUrl: (group_logoUrl: string) => void;
  setGroupManagerName: (manager_name: string) => void;
  setGroupManagerEmail: (manager_email: string) => void;
  setGroupManagerPhone: (manager_phone: string) => void;
  setLocation: (location: string) => void;
  setAddress: (address: string) => void;
}

const useGroupStore = create<GroupStore>((set) => {
  // Create initial empty state
  const initialState: GroupField = {
    group_name: "",
    group_code: "",
    manager_name: "",
    manager_email: "",
    manager_phone: "",
    group_logo_url: "",
    location: "",
    address: "",
  };

  // If we're in the browser, try to load from localStorage
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem("fastinsure--group-fields");
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as GroupField;
        Object.assign(initialState, parsed);
      } catch (e) {
        console.error("Failed to parse stored group fields:", e);
      }
    }
  }

  return {
    ...initialState,
    groupFields: {
      group_code: "",
      group_name: "",
      manager_name: "",
      manager_email: "",
      manager_phone: "",
      group_logo_url: "",
      location: "",
      address: "",
    },
    setGroupField: (fields: GroupField) => {
      set(fields);
      localStorage.setItem("fastinsure--group-fields", JSON.stringify(fields));
    },
    setGroupName: (group_name: string) => {
      set((state) => {
        const newState = { ...state, group_name };
        localStorage.setItem("fastinsure--group-fields", JSON.stringify(newState));
        return newState;
      });
    },
    setGroupCode: (group_code: string) => {
      set((state) => {
        const newState = { ...state, group_code };
        localStorage.setItem("fastinsure--group-fields", JSON.stringify(newState));
        return newState;
      });
    },
    setGroupLogoUrl: (group_logo_url: string) => {
      set((state) => {
        const newState = { ...state, group_logo_url };
        localStorage.setItem("fastinsure--group-fields", JSON.stringify(newState));
        return newState;
      });
    },
    // Add other setters with the same pattern
    setGroupManagerName: (manager_name: string) =>
      set((state) => {
        const newState = { ...state, manager_name };
        localStorage.setItem("fastinsure--group-fields", JSON.stringify(newState));
        return newState;
      }),
    setGroupManagerEmail: (manager_email: string) =>
      set((state) => {
        const newState = { ...state, manager_email };
        localStorage.setItem("fastinsure--group-fields", JSON.stringify(newState));
        return newState;
      }),
    setGroupManagerPhone: (manager_phone: string) =>
      set((state) => {
        const newState = { ...state, manager_phone };
        localStorage.setItem("fastinsure--group-fields", JSON.stringify(newState));
        return newState;
      }),
    setLocation: (location: string) =>
      set((state) => {
        const newState = { ...state, location };
        localStorage.setItem("fastinsure--group-fields", JSON.stringify(newState));
        return newState;
      }),
    setAddress: (address: string) =>
      set((state) => {
        const newState = { ...state, address };
        localStorage.setItem("fastinsure--group-fields", JSON.stringify(newState));
        return newState;
      }),
  };
});

const ToolbarComponent = ({ closeFn, v, title, variant }: ToolbarProps<Partial<GroupField>>) => {
  return (
    <SpToolbar description="" closeFn={closeFn} variant={variant} size="xl">
      <FlexRow className="h-full items-start justify-between">
        <FlexRow className="w-full h-24 items-center p-2">
          <Image
            alt={`logo-of-${v?.group_name}`}
            src={v?.group_logo_url && v.group_logo_url !== "" ? v.group_logo_url : "/svg/f_v2.svg"}
            className="size-16"
            isBlurred
          />
          <div className="block space-y-2.5">
            <h1 className="max-w-[30ch] font-inst overflow-x-scroll text-primary/80 text-xl font-semibold capitalize leading-none tracking-tighter text-primary">
              {title ?? "Group Name"}
            </h1>
            <div className="space-y-1.5">
              <h2 className="text-sm leading-none font-medium tracking-tight text-primary/80 dark:text-secondary">
                {v?.manager_name ? <div className="">{v?.manager_name}<span className="ps-2 text-macl-gray text-xs font-normal">Manager</span></div> : "Manager's Name"}
              </h2>
              <h3 className="flex space-x-2 text-xs leading-none tracking-tight text-macl-gray dark:text-secondary">
                {v?.manager_email ? <span className="text-macl-blue">{v?.manager_email}</span> : "Email"} <span className="">●</span> {v?.manager_phone ? <span className="text-macl-blue">{v?.manager_phone}</span> : "Phone"}
              </h3>
            </div>
          </div>
        </FlexRow>
        <div className="size-[3rem]">
          <ButtSqx icon="close" onClick={closeFn}></ButtSqx>
        </div>
      </FlexRow>
      <FlexRow className="h-8 w-full border-t-[0.0px] bg-gradient-to-r from-transparent via-macd-gray/5 to-transparent border-macd-gray/30 items-center flex space-x-4 px-4">
        {v?.location ? <div className="text-macl-gray text-xs flex space-x-1 items-center"><BuildingOffice2Icon className="size-3" /><span>{v?.location}</span><span className="ps-2 text-macl-gray text-xs font-normal"></span></div> : null}
        {v?.address ? <div className="text-macl-gray text-xs flex space-x-1 items-center"><MapPin className="size-3" /><span>{v?.address}</span><span className="ps-2 text-macl-gray text-xs font-normal"></span></div> : null}
      </FlexRow>
    </SpToolbar>
  );
};

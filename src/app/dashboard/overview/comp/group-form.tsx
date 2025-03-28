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
import { BuildingOfficeIcon, EnvelopeIcon, MapIcon, MapPinIcon, PhoneIcon, PuzzlePieceIcon, UserCircleIcon, UsersIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { BuildingOffice2Icon, MapPinIcon as MapPin } from "@heroicons/react/24/solid";
import { Image } from "@nextui-org/react";
import { UserCog2 } from "lucide-react";
import { type ChangeEvent, type FC, type FocusEvent, useActionState, useCallback, useMemo } from "react";
import { create } from "zustand";
import { useGroup } from "../../hooks/useGroup";
import { BasicAction } from "./actions";
import { ButtSex } from "@/ui/button/ripple";
import { z } from "zod";

export const CreateGroup = () => {
  const { open, toggle } = useGroup();
  const handleCreate = useCallback(() => {
    if (!open) {
      toggle();
    }
  }, [toggle, open]);

  const {
    groupName,
    groupCode,
    groupLogoUrl,
    groupManagerName,
    groupManagerEmail,
    groupManagerPhone,
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
        title={groupName}
        closeFn={toggle}
        icon={UserCog2}
        variant="goddess"
        v={{ groupManagerName, groupManagerEmail, groupManagerPhone, groupLogoUrl, location, address }}
      />
    );
  }, [toggle, groupName, groupManagerName, groupManagerEmail, groupManagerPhone, groupLogoUrl, location, address]);

  const onChangeFn = useCallback((setFn: (value: string) => void) => (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFn(e.target.name === "groupCode" ? String(e.target.value).toUpperCase() : e.target.value);
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
      name: "groupName",
      label: "Group Name",
      required: true,
      description: "Name of the Group, Branch, or Office.",
      placeholder: "Group name",
      icon: BuildingOfficeIcon,
      defaultValue: groupName,
      onChange: onChangeFn(setGroupName),
      onBlur
    },
    {
      name: "groupCode",
      label: "Group Code",
      required: true,
      description: "Code identifier for the group.",
      placeholder: "Group code",
      icon: PuzzlePieceIcon,
      defaultValue: groupCode,
      onChange: onChangeFn(setGroupCode),
      onBlur
    },
    {
      name: "groupManagerName",
      label: "Manager's Name",
      required: true,
      description: "Group Manager's Name.",
      placeholder: "Manager's Name",
      icon: UserCircleIcon,
      defaultValue: groupManagerName,
      onChange: onChangeFn(setGroupManagerName),
      onBlur
    },
    {
      name: "groupManagerEmail",
      label: "Manager's Email",
      required: true,
      description: "Group Manager's Email.",
      placeholder: "Manager's Email",
      icon: EnvelopeIcon,
      defaultValue: groupManagerEmail,
      onChange: onChangeFn(setGroupManagerEmail),
      onBlur
    },
    {
      name: "groupManagerPhone",
      label: "Manager's Phone",
      description: "Group Manager's Phone.",
      placeholder: "Manager's Phone",
      icon: PhoneIcon,
      defaultValue: groupManagerPhone,
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
      name: "groupLogoUrl",
      label: "Group Logo",
      description: "Group's office address.",
      placeholder: "Logo",
      icon: MapIcon,
      type: "file",
      required: false,
      defaultValue: groupLogoUrl,
      onChange: onChangeFn(setGroupLogoUrl),
      onBlur
    },
  ], [groupName, groupCode, groupLogoUrl, onChangeFn, setGroupName, setGroupCode, setGroupLogoUrl, onBlur, setGroupManagerPhone, setLocation, setAddress, address, groupManagerPhone, groupManagerEmail, groupManagerName, location, setGroupManagerName, setGroupManagerEmail])


  return (
    <BasicAction
      title="Create New Group"
      subtext="New Group / Branch"
      icon={UsersIcon}
      fn={handleCreate}
      label="create"
      loading={false}
    >
      <NewGroupWindow open={open} toggle={toggle} toolbar={Toolbar} data={group_fields} initialState={groupFields} />
    </BasicAction>
  );
};

interface NewGroupWindowProps {
  open: boolean;
  toggle: () => void;
  toolbar: FC<StaticToolbarProps>;
  data: GroupFields[]
  initialState: Partial<GroupField>
}

const NewGroupWindow = ({ open, toggle, data, toolbar, initialState }: NewGroupWindowProps) => {
  const handleCreateGroup = useCallback((initialState: Partial<GroupField | null>, fd: FormData) => {
    try {
      // Create a properly typed object from FormData
      const formData: Partial<GroupField> = {
        groupName: fd.get("groupName") as string,
        groupCode: fd.get("groupCode") as string,
        // groupLogoUrl: fd.get("groupLogoUrl") as string,
        groupManagerName: fd.get("groupManagerName") as string,
        groupManagerEmail: fd.get("groupManagerEmail") as string,
        groupManagerPhone: fd.get("groupManagerPhone") as string,
        location: fd.get("groupLocation") as string,
        address: fd.get("groupAddress") as string,
      };

      const validation = GroupFieldSchema.safeParse(formData);

      if (!validation.success) {
        console.error(validation.error.message);
        return null
      }

      // Store validated data in localStorage
      // localStorage.setItem("fastinsure--group-fields", JSON.stringify(validation.data));

      // Close drawer on success
      // toggle();
      console.table(validation.data);
      return validation.data

    } catch (error) {
      console.error(error instanceof Error ? error.message : 'Failed to create group');
      return null
    }
  }, []);

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
            <ButtSex type="submit" inverted disabled={pending}>
              {pending ? 'Creating...' : 'Create Group'}
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
      <FastField icon={icon} name={name} defaultValue={defaultValue} onChange={onChange} onBlur={onBlur} required={required} placeholder={placeholder} className={cn("border-b-[0.33px] border-gray-400/60", { "uppercase": name === "groupCode" }, className)} />
    </div>
  );
};

const GroupFieldSchema = z.object({
  groupName: z.string().min(2).max(100),
  groupCode: z.string().min(2).max(100),
  groupManagerName: z.string().min(2).max(100),
  groupManagerEmail: z.string().email().min(2).max(100),
  groupManagerPhone: z.string().min(2).max(100),
  groupLogoUrl: z.string().url().optional(),
  location: z.string().min(2).max(100),
  address: z.string().min(2).max(100),
});

type GroupField = z.infer<typeof GroupFieldSchema>;

interface GroupStore extends GroupField {
  groupFields: GroupField;
  setGroupField: (fields: GroupField) => void
  setGroupName: (groupName: string) => void;
  setGroupCode: (groupCode: string) => void;
  setGroupLogoUrl: (groupLogoUrl: string) => void;
  setGroupManagerName: (groupManagerName: string) => void;
  setGroupManagerEmail: (groupManagerEmail: string) => void;
  setGroupManagerPhone: (groupManagerPhone: string) => void;
  setLocation: (location: string) => void;
  setAddress: (address: string) => void;
}

const useGroupStore = create<GroupStore>((set) => {
  // Create initial empty state
  const initialState: GroupField = {
    groupName: "",
    groupCode: "",
    groupManagerName: "",
    groupManagerEmail: "",
    groupManagerPhone: "",
    groupLogoUrl: "",
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
    groupFields: initialState,
    setGroupField: (fields: GroupField) => {
      set(fields);
      localStorage.setItem("fastinsure--group-fields", JSON.stringify(fields));
    },
    setGroupName: (groupName: string) => {
      set((state) => {
        const newState = { ...state, groupName };
        localStorage.setItem("fastinsure--group-fields", JSON.stringify(newState));
        return newState;
      });
    },
    setGroupCode: (groupCode: string) => {
      set((state) => {
        const newState = { ...state, groupCode };
        localStorage.setItem("fastinsure--group-fields", JSON.stringify(newState));
        return newState;
      });
    },
    setGroupLogoUrl: (groupLogoUrl: string) => {
      set((state) => {
        const newState = { ...state, groupLogoUrl };
        localStorage.setItem("fastinsure--group-fields", JSON.stringify(newState));
        return newState;
      });
    },
    // Add other setters with the same pattern
    setGroupManagerName: (groupManagerName: string) =>
      set((state) => {
        const newState = { ...state, groupManagerName };
        localStorage.setItem("fastinsure--group-fields", JSON.stringify(newState));
        return newState;
      }),
    setGroupManagerEmail: (groupManagerEmail: string) =>
      set((state) => {
        const newState = { ...state, groupManagerEmail };
        localStorage.setItem("fastinsure--group-fields", JSON.stringify(newState));
        return newState;
      }),
    setGroupManagerPhone: (groupManagerPhone: string) =>
      set((state) => {
        const newState = { ...state, groupManagerPhone };
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
            alt={`logo-of-${v?.groupName}`}
            src={v?.groupLogoUrl && v.groupLogoUrl !== "" ? v.groupLogoUrl : "/svg/f_v2.svg"}
            className="size-16"
            isBlurred
          />
          <div className="block space-y-2.5">
            <h1 className="max-w-[30ch] font-inst overflow-x-scroll text-primary/80 text-xl font-semibold capitalize leading-none tracking-tighter text-primary">
              {title ?? "Group Name"}
            </h1>
            <div className="space-y-1.5">
              <h2 className="text-sm leading-none font-medium tracking-tight text-primary/80 dark:text-secondary">
                {v?.groupManagerName ? <div className="">{v?.groupManagerName}<span className="ps-2 text-macl-gray text-xs font-normal">Manager</span></div> : "Manager's Name"}
              </h2>
              <h3 className="flex space-x-2 text-xs leading-none tracking-tight text-macl-gray dark:text-secondary">
                {v?.groupManagerEmail ? <span className="text-macl-blue">{v?.groupManagerEmail}</span> : "Email"} <span className="">●</span> {v?.groupManagerPhone ? <span className="text-macl-blue">{v?.groupManagerPhone}</span> : "Phone"}
              </h3>
            </div>
          </div>
        </FlexRow>
        <div className="size-[3rem]">
          <ButtSqx icon={XMarkIcon} onClick={closeFn}></ButtSqx>
        </div>
      </FlexRow>
      <FlexRow className="h-8 w-full border-t-[0.0px] bg-gradient-to-r from-transparent via-macd-gray/5 to-transparent border-macd-gray/30 items-center flex space-x-4 px-4">
        {v?.location ? <div className="text-macl-gray text-xs flex space-x-1 items-center"><BuildingOffice2Icon className="size-3" /><span>{v?.location}</span><span className="ps-2 text-macl-gray text-xs font-normal"></span></div> : null}
        {v?.address ? <div className="text-macl-gray text-xs flex space-x-1 items-center"><MapPin className="size-3" /><span>{v?.address}</span><span className="ps-2 text-macl-gray text-xs font-normal"></span></div> : null}
      </FlexRow>
    </SpToolbar>
  );
};

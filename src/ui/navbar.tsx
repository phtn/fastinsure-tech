import { Navbar, NavbarBrand, NavbarContent } from "@nextui-org/react";
import { Logo } from "./logo";

export const Nav = () => {
  return (
    <Navbar isBlurred maxWidth="full">
      <NavbarContent justify="start">
        <NavbarBrand className="mr-4">
          <Logo />
          <p className="hidden font-bold text-inherit sm:block"></p>
        </NavbarBrand>
        <NavbarContent className="hidden gap-3 sm:flex">
          {/* <NavbarItem>
            <Link color="foreground" href="#">
              Features
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link href="#" aria-current="page" color="primary">
              Customers
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              Integrations
            </Link>
          </NavbarItem> */}
        </NavbarContent>
      </NavbarContent>

      <NavbarContent
        as="div"
        className="items-center"
        justify="end"
      ></NavbarContent>
    </Navbar>
  );
};

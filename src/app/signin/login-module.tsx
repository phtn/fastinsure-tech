import { SignInModule } from "./signin";
import { Chart } from "./chart";
import { Screen } from "@/ui/screen";
import { HStack } from "@/ui/hstack";

export const LoginModule = () => (
  <Screen>
    <Screen.PadSm />
    <Screen.Inverted>
      <Screen.Header>
        <Screen.Title dark>Partner Login</Screen.Title>
        <Screen.Subtext>Sign in email or phone number</Screen.Subtext>
      </Screen.Header>

      <HStack cols={5}>
        <HStack.Col>
          <SignInModule />
        </HStack.Col>

        <HStack.Col lg>
          <HStack.Title>Remote Monitoring</HStack.Title>
          <Chart />
        </HStack.Col>
      </HStack>
    </Screen.Inverted>
    <Screen.PadLg />
  </Screen>
);
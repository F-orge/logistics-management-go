import type { RouteSectionProps } from "@solidjs/router";
import { type Component, createSignal } from "solid-js";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const AuthLayout = (props: RouteSectionProps) => {
  const [language, setLanguage] = createSignal("English");

  return (
    <main class="h-screen max-h-screen grid grid-cols-3">
      <aside class="bg-secondary col-span-1 p-4">
        <div class="flex flex-row justify-between items-center">
          <img src="https://placehold.co/36x36" alt="" />
          <Select
            defaultValue={"English"}
            class="bg-primary text-primary-foreground rounded-md"
            value={language()}
            onChange={setLanguage}
            options={["English"]}
            itemComponent={(props) => (
              <SelectItem
                class="bg-primary text-primary-foreground rounded-md"
                item={props.item}
              >
                {props.item.rawValue}
              </SelectItem>
            )}
          >
            <SelectTrigger
              class="bg-primary text-primary-foreground rounded-md"
              aria-label="preferred-language"
            >
              <SelectValue<string>
                class="bg-primary text-primary-foreground rounded-md"
              >
                {(state) => state.selectedOptions()}
              </SelectValue>
            </SelectTrigger>
            <SelectContent class="bg-primary text-primary-foreground rounded-md" />
          </Select>
        </div>
      </aside>
      <article class="col-span-2 py-24">{props.children}</article>
    </main>
  );
};

export default AuthLayout;

import next from "next/eslint-plugin";
import storybook from "@storybook/eslint-plugin";
import { configs } from "eslint-plugin-storybook";

export default [next.configs["core-web-vitals"], configs.recommended];

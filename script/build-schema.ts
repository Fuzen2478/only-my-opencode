#!/usr/bin/env bun
import * as z from "zod";
import { OnlyMyOpenCodeConfigSchema } from "../src/config/schema";

const SCHEMA_OUTPUT_PATH = "assets/only-my-opencode.schema.json";

async function main() {
  console.log("Generating JSON Schema...");

  const jsonSchema = z.toJSONSchema(OnlyMyOpenCodeConfigSchema, {
    io: "input",
    target: "draft-7",
  });

  const finalSchema = {
    $schema: "http://json-schema.org/draft-07/schema#",
    $id: "https://raw.githubusercontent.com/fuzen2478/only-my-opencode/master/assets/only-my-opencode.schema.json",
    title: "Oh My OpenCode Configuration",
    description: "Configuration schema for only-my-opencode plugin",
    ...jsonSchema,
  };

  await Bun.write(SCHEMA_OUTPUT_PATH, JSON.stringify(finalSchema, null, 2));

  console.log(`✓ JSON Schema generated: ${SCHEMA_OUTPUT_PATH}`);
}

main();

import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

/**
 * Adds isArray: true to array fields in schema register methods
 * Finds z.array(...) and z.[type]().array() patterns
 */
async function fixArrayFields() {
  const schemasDir = "./src/pocketbase/schemas";

  try {
    console.log("📝 Adding isArray: true to array fields...");

    const subdirs = await readdir(schemasDir, { withFileTypes: true });
    let totalFixed = 0;

    for (const subdir of subdirs) {
      if (!subdir.isDirectory()) continue;

      const schemaSubDir = path.join(schemasDir, subdir.name);
      const files = await readdir(schemaSubDir);

      for (const file of files) {
        if (!file.endsWith(".ts") || file === "index.ts") continue;

        const filePath = path.join(schemaSubDir, file);
        let content = await readFile(filePath, "utf-8");
        const originalContent = content;
        let fixedCount = 0;

        // Split into lines to process more carefully
        const lines = content.split("\n");

        for (let i = 0; i < lines.length; i++) {
          const line = lines[i];

          // Look for .array() or z.array( patterns
          if (
            line.includes(".array(") ||
            line.includes("z.array(") ||
            line.includes("z.file(")
          ) {
            // Look forward to find the .register call
            let registerIndex = -1;
            for (let j = i; j < Math.min(i + 20, lines.length); j++) {
              if (lines[j].includes(".register(fieldRegistry")) {
                registerIndex = j;
                break;
              }
            }

            if (registerIndex !== -1) {
              // Look for isArray in the register block
              let hasIsArray = false;
              let inputTypeLineIndex = -1;

              for (
                let j = registerIndex;
                j < Math.min(registerIndex + 15, lines.length);
                j++
              ) {
                if (lines[j].includes("isArray")) {
                  hasIsArray = true;
                  break;
                }
                if (
                  lines[j].includes("inputType:") &&
                  !lines[j].includes("//")
                ) {
                  inputTypeLineIndex = j;
                }
                if (lines[j].includes("});") || lines[j].includes("},")) {
                  break;
                }
              }

              // Add isArray after inputType if not present
              if (!hasIsArray && inputTypeLineIndex !== -1) {
                const inputLine = lines[inputTypeLineIndex];
                if (inputLine.includes(",")) {
                  // Already has trailing comma, good
                  lines[inputTypeLineIndex] = inputLine.replace(
                    /inputType:\s*"[^"]*",/,
                    `$&\n        isArray: true,`
                  );
                } else if (inputLine.includes("}")) {
                  // No comma, add it
                  lines[inputTypeLineIndex] = inputLine.replace(
                    /inputType:\s*"[^"]*"/,
                    `$&,\n        isArray: true`
                  );
                } else {
                  // Safe to add
                  lines[inputTypeLineIndex] = inputLine.replace(
                    /inputType:\s*"[^"]*"/,
                    `$&,\n        isArray: true`
                  );
                }
                fixedCount++;
                i = registerIndex + 5; // Skip ahead to avoid reprocessing
              }
            }
          }
        }

        content = lines.join("\n");

        if (content !== originalContent) {
          await writeFile(filePath, content, "utf-8");
          console.log(
            `✅ Fixed: ${path.relative(".", filePath)} (${fixedCount} field(s))`
          );
          totalFixed += fixedCount;
        }
      }
    }

    console.log(`\n✨ Fixed ${totalFixed} array field(s) successfully!`);
  } catch (error) {
    console.error("❌ Error fixing array fields:", error);
    process.exit(1);
  }
}

fixArrayFields();

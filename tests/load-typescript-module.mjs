import { readFile } from "node:fs/promises"
import ts from "typescript"

export async function loadTypescriptModule(relativePath, importMetaUrl) {
  const source = await readFile(new URL(relativePath, importMetaUrl), "utf8")
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2022,
    },
  })
  const moduleUrl = `data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`
  return import(moduleUrl)
}

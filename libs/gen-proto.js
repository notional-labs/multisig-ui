import path from "path";
import telescope from "@osmonauts/telescope";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const protoDirs = [path.join(__dirname, "../proto")];
const outPath = path.join(__dirname, "/proto");

export const importProto = async () => {
    
}

export const createProto = async () => {
    console.log(telescope)
    telescope({
        protoDirs,
        outPath,
        options: {
            includePackageVar: false,
            typingsFormat: {
                useExact: false,
                timestamp: "date",
                duration: "duration"
            },
            aminoEncoding: {
                enabled: true
            },
            lcdClients: {
                enabled: false
            },
            rpcClients: {
                enabled: false
            }
        }
    }).then(() => {
        console.log("done")
    }).catch (e => {
        console.log(e.message)
    })
}

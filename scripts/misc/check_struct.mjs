import fs from "fs";

async function check() {
  try {
    const res = await fetch(
      "https://raw.githubusercontent.com/kashishkhullar/gita_json/master/dataset_hindi.json",
    );
    const data = await res.json();
    const keys = Object.keys(data);
    let str = "Root keys: " + keys.join(", ") + "\n";
    for (const key of keys) {
      if (typeof data[key] === "object" && data[key] !== null) {
        str +=
          key +
          " keys/length: " +
          (Array.isArray(data[key])
            ? data[key].length
            : Object.keys(data[key]).slice(0, 10).join(",")) +
          "\n";
        if (!Array.isArray(data[key]) && Object.keys(data[key]).length > 0) {
          const firstKey = Object.keys(data[key])[0];
          str +=
            "  first sub-item keys: " +
            typeof data[key][firstKey] +
            " " +
            (typeof data[key][firstKey] === "object"
              ? Object.keys(data[key][firstKey]).join(", ")
              : "") +
            "\n";
        }
      }
    }
    fs.writeFileSync(
      "c:\\Users\\Veer Pal Singh\\Desktop\\Darshanam\\structure.txt",
      str,
    );
  } catch (e) {
    fs.writeFileSync(
      "c:\\Users\\Veer Pal Singh\\Desktop\\Darshanam\\structure.txt",
      e.stack,
    );
  }
}
check();

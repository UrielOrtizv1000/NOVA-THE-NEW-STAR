// lib.rs — Library entry point of the NOVA desktop shell.
//
// Tauri uses this to build the native application library that the
// binary in main.rs links against. Business logic stays in TypeScript;
// this file is intentionally small.

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .run(tauri::generate_context!())
        .expect("error while running NOVA");
}

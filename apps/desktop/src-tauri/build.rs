// build.rs — Tauri build script.
//
// This runs before the Rust crate is compiled. It lets Tauri set up
// platform-specific configuration (e.g. embedding the frontend assets
// and generating the window bindings). It is part of the standard
// Tauri scaffold and should not need changes.

fn main() {
    tauri_build::build()
}

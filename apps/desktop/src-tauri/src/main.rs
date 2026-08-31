// main.rs — Binary entry point of the NOVA desktop app.
//
// The binary is just a thin wrapper that calls the library's `run()`
// function defined in lib.rs. Keeping the logic in the library makes
// it testable and reusable.

// Prevents the console window from flashing on Windows release builds.
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn main() {
    nova_desktop_lib::run()
}

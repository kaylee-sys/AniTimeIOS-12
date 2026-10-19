# AniTime for Xen HTML

A ported and optimized version of the popular anime clock widget for iOS Lock Screens and Home Screens. This widget is specifically rewritten to run smoothly on legacy mobile browser engines (WebKit) using the native API of the **Xen HTML** tweak.

## 📱 Compatibility & Testing

* **iOS 12.x:** **Officially tested and confirmed.** It runs completely stable, smoothly renders local GIF animations, and seamlessly passes menu options directly into JavaScript.
* **Other Versions (iOS 9 - iOS 14):** Functionality on other iOS versions **is not guaranteed**. You may use this widget at your own risk; however, folder switching and animation stability were exclusively verified on iOS 12.

## ✨ Port Features

* **Fully Autonomous:** Operates 100% locally. It does not require an internet connection, consumes zero mobile data, and saves battery life.
* **Native Settings Integration:** All widget preferences can be adjusted directly inside the system Xen HTML settings menu via `config.json`.
* **Three Graphic Styles:** Supports both animated GIFs and static PNG sprites (`s-animated`, `s-static`, `m-static`).
* **Adaptive Sizing:** Features support for seconds, 12/24-hour clock toggling, smooth scaling (Zoom), and vertical alignment options.

## 🛠 Prerequisites for Manual Installation

* **Device:** An iPhone or iPad running a jailbroken iOS version.
* **Tweaks:** **Xen HTML** engine and **Filza File Manager**.

## 📦 Manual Installation Guide

1. Download the repository archive to your PC or directly to your iOS device.
2. Ensure that your widget folder contains the `assets` directory (with the `s-animated`, `s-static`, and `m-static` graphic packs) along with `index.html`, `style.css`, `main.js`, and `config.json`.
3. Using **Filza File Manager**, transfer the entire folder (naming it exactly **`AniTimeHTML`**) to your iOS device using the following directory path:
   `/var/mobile/Library/LockHTML/`
   *(If the folder does not show up in the Xen HTML list, use the alternative path: `/var/mobile/Library/Widgets/Universal/`)*
4. Open **iOS Settings** -> **Xen HTML**.
5. Go to the Lockscreen or Homescreen menu -> **Foreground Widgets** -> **Add Widget**.
6. Select **AniTimeHTML** from the list, configure the options to your liking, and apply the changes.
7. Perform a **Respring** on your device to refresh the animation cache.

## ⚙️ Available Settings in Xen HTML Menu

* **Medium (static) / Small (static):** Toggle static PNG character sprites of different sizes.
* **Small (animated):** Toggle the original animated GIF characters (selected by default).
* **12-hour clock:** Switch between 12-hour and 24-hour time formats.
* **Show seconds:** Display or hide the seconds block.
* **Show background:** Enable a light, semi-transparent backing panel under the clock.
* **Zoom x:** Smoothly adjust the global scale of the widget layout.
* **Widget Position Y:** Shift the clock higher or lower on your screen.

## 🗂 Widget Folder Structure

```text
AniTimeHTML/
├── assets/
│   ├── m-static/       # PNG images from 0 to 9 (medium size)
│   ├── s-animated/     # GIF animations from 0 to 9 (small size)
│   └── s-static/       # PNG images from 0 to 9 (small size)
├── config.json         # Menu configuration structure for Xen HTML
├── index.html          # Widget layout and pre-loading cache engine
├── main.js             # Clock engine logic and preference hooks
└──style.css           # Layout styling and responsiveness rules
```

## 🤝 Credits
The original concept of the character digital display clock and all graphic assets belong to **charlie0129**, the author of the open-source web project AniClock.

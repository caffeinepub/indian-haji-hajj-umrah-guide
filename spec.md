# Indian Haji - Hajj & Umrah Guide

## Current State
Voice recording (StepVoiceRecorder) is visible to all users. App has existing admin authorization in backend. Regular users browse/listen without login.

## Requested Changes (Diff)

### Add
- A simple frontend admin auth context with hardcoded credentials: username `admin`, password `haji786`
- An "Admin Login" button in the Navbar (top right)
- A login dialog (modal) with username + password fields
- Once logged in, show an "Admin" badge in navbar and a logout option
- `StepVoiceRecorder` component only renders when the user is logged in as admin

### Modify
- Wrap the app in `AdminAuthProvider`
- In `UmrahGuide`, `HajjGuide`, `DuaLibrary`: check `isAdmin` from context before rendering `<StepVoiceRecorder />`
- Navbar: show login/logout button

### Remove
- Nothing removed — regular users can still browse and play audio without login

## Implementation Plan
1. Create `src/frontend/src/contexts/AdminAuthContext.tsx` — stores isAdmin in state + sessionStorage, exposes login(username, password)/logout functions
2. Wrap `<App>` or router root with `<AdminAuthProvider>`
3. Add Admin Login button + Dialog to Navbar
4. Gate `<StepVoiceRecorder>` with `isAdmin` in all three guide pages

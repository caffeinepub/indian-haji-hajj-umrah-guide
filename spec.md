# Indian Haji - Hajj & Umrah Guide

## Current State
UmrahGuide.tsx and HajjGuide.tsx have hardcoded step descriptions. Admins can record voice per step. Step text is static.

## Requested Changes (Diff)

### Add
- Admin-only inline text editor on each step (Umrah and Hajj)
- "Edit Text" button visible only when isAdmin is true
- Edited text stored in localStorage per step (key: `step_text_umrah_1`, `step_text_hajj_1`, etc.)
- Displayed custom text replaces or appends below default description for all users

### Modify
- UmrahGuide.tsx: show editable text area when admin clicks Edit, save to localStorage, display saved text
- HajjGuide.tsx: same pattern

### Remove
- Nothing removed

## Implementation Plan
1. Create a reusable `StepTextEditor` component that:
   - Takes stepId, defaultText as props
   - Reads saved text from localStorage on mount
   - When isAdmin: shows Edit button, clicking shows textarea + Save/Cancel
   - Displays saved custom text (if any) or default text to all users
2. Integrate StepTextEditor into UmrahGuide and HajjGuide step expanded content

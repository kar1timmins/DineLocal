---
name: design-review
description: Conduct a comprehensive design review of UI changes using the ui-design-reviewer agent
---

You need to invoke the ui-design-reviewer agent to conduct a comprehensive design review of the current UI changes.

First, start the development server if it's not already running, then use the ui-design-reviewer agent to systematically review all UI changes following the phases outlined in /.claude/agents/ui-design-reviewer.md.

The agent will:

1. Initial Assessment - Analyze changes, review specs, and identify modified components
2. Visual Design & Polish - Assess typography, color, spacing, layout, and visual hierarchy
3. Responsive Design Testing - Verify across mobile/tablet/desktop viewports using Playwright
4. Accessibility Compliance - Check WCAG 2.1 AA standards (keyboard nav, screen readers, contrast)
5. User Experience & Interaction Quality - Test interactions, UX patterns, and user flows with Playwright
6. Cross-Browser Consistency - Test rendering in Chrome, Firefox, and Safari
7. Design System & Code Quality - Verify design tokens, component reuse, and pattern adherence

Use the Task tool to invoke the ui-design-reviewer agent with the following prompt:

"Review the UI changes in this project. The development server should be running on http://localhost:3000. Conduct a comprehensive design review following all phases in your methodology. Provide a structured report with findings, mentioned in ui-design-reviewer agent."

The final output should be a markdown report following the structure defined in the agent configuration.

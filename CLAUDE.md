# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working in this repository.

## Project Overview

Please refer to plans/main.md for the project overview.

---

Behavioral guidelines to reduce common LLM coding mistakes.

Tradeoff: these guidelines bias toward caution over speed. For trivial tasks, use judgment.

## 1. Think Before Coding

Don't assume. Don't hide confusion. Surface tradeoffs.

Before implementing:

- State assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them.
- If a simpler approach exists, say so.
- If something is unclear, stop and ask.

## 2. Simplicity First

Minimum code that solves the problem. Nothing speculative.

- No extra features beyond the ask.
- No abstractions for one-off code.
- No unnecessary configurability.
- No complexity for impossible scenarios.

If 200 lines can be 50, simplify.

## 3. Surgical Changes

Touch only what you must. Clean up only your own mess.

- Do not refactor unrelated code.
- Match existing style.
- Remove only unused code introduced by your own changes.

Every changed line should trace to the request.

## 4. Goal-Driven Execution

Define success criteria and verify outcomes.

Examples:

- "Add validation" -> tests for invalid inputs, then implementation
- "Fix bug" -> reproduce with a test, then make it pass
- "Refactor" -> verify behavior before and after

For multi-step tasks, use concise checkable plans:

```text
1. [Step] -> verify: [check]
2. [Step] -> verify: [check]
3. [Step] -> verify: [check]
```

These guidelines are working if diffs stay minimal, rewrites decrease, and clarifying questions happen before implementation.

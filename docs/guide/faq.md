# Frequently Asked Questions

<!--
TODO
## What is the difference between tsdown and Rolldown?

## Why should I use tsdown instead of other bundlers (like tsup, unbuild, ...)? -->

## Will tsdown support stub mode (similar to unbuild)? {#stub-mode}

Currently, `tsdown` does **not** support stub mode, and there are no immediate plans to add it. In today's ecosystem, we believe that a simple stub mode offers limited practical value for most library development workflows. Instead, we recommend using [watch mode](../options/watch-mode.md) for a fast and efficient development experience. For a more detailed explanation of this decision, please see [this GitHub comment](https://github.com/rolldown/tsdown/pull/164#issuecomment-2849720617).

While stub mode is not supported at this time, we may revisit this decision in the future if the ecosystem evolves and the need becomes more compelling.

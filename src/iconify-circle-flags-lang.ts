import { addCollection } from '@iconify/react'

/** Minimal circle-flags subset (CO + US) — avoids bundling the full @iconify-json/circle-flags set. */
const circleFlagsLang = {
  prefix: 'circle-flags',
  icons: {
    co: {
      width: 512,
      height: 512,
      body: '<mask id="bhCircleFlagsCo"><circle cx="256" cy="256" r="256" fill="#fff"/></mask><g mask="url(#bhCircleFlagsCo)"><path fill="#d80027" d="m0 384l255.8-29.7L512 384v128H0z"/><path fill="#0052b4" d="m0 256l259.5-31L512 256v128H0z"/><path fill="#ffda44" d="M0 0h512v256H0z"/></g>',
    },
    us: {
      width: 512,
      height: 512,
      body: '<mask id="bhCircleFlagsUs"><circle cx="256" cy="256" r="256" fill="#fff"/></mask><g mask="url(#bhCircleFlagsUs)"><path fill="#eee" d="M256 0h256v64l-32 32l32 32v64l-32 32l32 32v64l-32 32l32 32v64l-256 32L0 448v-64l32-32l-32-32v-64z"/><path fill="#d80027" d="M224 64h288v64H224Zm0 128h288v64H256ZM0 320h512v64H0Zm0 128h512v64H0Z"/><path fill="#0052b4" d="M0 0h256v256H0Z"/><path fill="#eee" d="m187 243l57-41h-70l57 41l-22-67zm-81 0l57-41H93l57 41l-22-67zm-81 0l57-41H12l57 41l-22-67zm162-81l57-41h-70l57 41l-22-67zm-81 0l57-41H93l57 41l-22-67zm-81 0l57-41H12l57 41l-22-67Zm162-82l57-41h-70l57 41l-22-67zm-81 0l57-41H93l57 41l-22-67zm-81 0l57-41H12l57 41l-22-67Z"/></g>',
    },
  },
}

addCollection(circleFlagsLang)

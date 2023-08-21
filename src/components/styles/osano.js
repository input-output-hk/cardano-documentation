import { css } from 'styled-components'
import { pxToRem } from '../../helpers/px-to-rem'
import testnetsTheme from "../../utils/testnetsTheme";

export const osanoVariables = css`
  --osano-white: #FFFFFF;
  --osano-black: #121326;
  --osano-primary: ${testnetsTheme.palette.primary.main};

  --osano-dialog-max-width: ${pxToRem(960)};
  --osano-dialog-elastic-padding: calc(
    (100% - min(100vw, var(--osano-dialog-max-width))) / 2
  );
  --osano-dialog-magic-padding: max(
    var(--osano-dialog-elastic-padding),
    ${pxToRem(20)}
  );
  --osano-close-color: var(--osano-black);
  --osano-link-color: var(--osano-black);
  --osano-disclosure-color: var(--osano-black);
  --osano-font-family: inherit;
  --osano-font-color: var(--osano-black);
  --osano-background-color: var(--osano-white);
  --osano-border-radius: 0;
  --osano-btn-font-variant: normal;
  --osano-btn-letter-spacing: normal;
  --osano-btn-border-radius: ${pxToRem(30)};
  --osano-btn-color: var(--osano-black);
  --osano-btn-bg-color: var(--osano-white);
  --osano-btn-hover-color: var(--osano-white);
  --osano-btn-bg-hover-color: var(--osano-primary);
  --osano-switch-color: #e0e0e0;
  --osano-switch-active-color: var(--osano-primary);
  --osano-border-gradient: linear-gradient(
    94.22deg,
    var(--osano-black) -18.3%,
    var(--osano-black) 118.89%
  );
  --osano-btn-border-gradient: linear-gradient(
    94.22deg,
    var(--osano-primary) -18.3%,
    var(--osano-primary) 118.89%
  );
  --osano-background-gradient: linear-gradient(
        var(--osano-background-color),
        var(--osano-background-color)
      )
      padding-box,
    var(--osano-border-gradient) border-box;
  --osano-btn-bg-gradient: linear-gradient(
        var(--osano-btn-bg-color),
        var(--osano-btn-bg-color)
      )
      padding-box,
    var(--osano-btn-border-gradient) border-box;
`

export const osanoStyling = css`
  /* Parent element */
  .osano-cm-window {
    font-family: var(--osano-font-family);
    font-size: 16px;
    /**
     * Initial Dialog
     * --------------
     *
     * 1. Make font color consistent
     * 2. Override background for gradient border effect
     *     - We can't use 'max-width: xxx; margin: auto' to center
     * 3. Align to center
     * 4. Make mobile whitespace consistent
     * 5. Make desktop whitespace consistent
     */
    .osano-cm-dialog {
      color: var(--osano-font-color); /* 1 */
      border-radius: var(--osano-border-radius, ${pxToRem(16)}); /* 2 */
      border: ${pxToRem(2)} solid transparent; /* 2 */
      background: var(--osano-background-gradient); /* 2 */
      margin-left: var(--osano-dialog-magic-padding); /* 3 */
      margin-right: var(--osano-dialog-magic-padding); /* 3 */
      padding: ${pxToRem(30)}; /* 4 */
      margin-bottom: ${pxToRem(20)}; /* 4 */
      line-height: 1.625;
      @media screen and (min-width: 768px) {
        padding: ${pxToRem(60)}; /* 5 */
        margin-bottom: ${pxToRem(40)}; /* 5 */
      }
    }
    /**
     * Button
     * ------
     *
     * 1. Make text consistent
     * 2. Gradient border effect
     * 3. Align size with site design
     * 4. Align hover effect with site design
     */
    .osano-cm-button {
      font-family: var(--osano-font-family); /* 1 */
      font-variant: var(--osano-btn-font-variant, normal);
      letter-spacing: var(--osano-btn-letter-spacing, normal);
      color: var(--osano-btn-color); /* 1 */
      background-color: var(--osano-btn-bg-color); /* 2 */
      border: ${pxToRem(2)} solid transparent; /* 2 */
      border-radius: var(--osano-btn-border-radius, ${pxToRem(14)}); /* 2 */
      background: var(--osano-btn-bg-gradient); /* 2 */
      height: ${pxToRem(44)}; /* 3 */
      transition: transform 0.1s ease-out, box-shadow 0.1s ease-out; /* 4 */
      &:hover:not(:disabled):not(:active):not([aria-selected="true"]) {
        transform: scale(1.035); /* 4 */
        box-shadow: ${pxToRem(0, 4, 10)} rgba(167, 143, 160, 0.2); /* 4 */
      }
    }
    /* Button: focus/hover */
    .osano-cm-button:focus,
    .osano-cm-button:hover {
      color: var(--osano-btn-hover-color);
      background: var(--osano-btn-bg-hover-color);
    }
    /* Buttons in group */
    .osano-cm-dialog--type_bar .osano-cm-button {
      width: 100%;
    }
    /**
     * When buttons are in a stack...
     * 1. Make mobile whitespace consistent
     * 2. Make desktop whitespace consistent
     */
    .osano-cm-dialog--type_bar .osano-cm-button + .osano-cm-button {
      margin-top: calc(${pxToRem(10)} - 0.25em); /* 1 */
      @media screen and (min-width: 768px) {
        margin-top: calc(${pxToRem(20)} - 0.25em); /* 2 */
      }
    }
    /**
     * 1. Remove user-agent defaults for link color
     */
    .osano-cm-link,
    .osano-cm-link:hover {
      color: var(--osano-link-color); /* 1 */
      font-weight: bold;
    }
    /**
     * Toggle Switch
     * -------------
     * 1. Align colors
     */
    .osano-cm-toggle__switch {
      background-color: var(--osano-switch-color); /* 1 */
    }
    /* Toggle switch: focus/hover */
    .osano-cm-toggle__input:focus + .osano-cm-toggle__switch,
    .osano-cm-toggle__input:hover + .osano-cm-toggle__switch {
      background-color: var(--osano-switch-color); /* 1 */
      border-color: var(--osano-switch-color); /* 1 */
    }
    /* Toggle switch: checked: focus/hover */
    .osano-cm-toggle__input:checked:focus + .osano-cm-toggle__switch,
    .osano-cm-toggle__input:checked:hover + .osano-cm-toggle__switch,
    .osano-cm-toggle__input:checked + .osano-cm-toggle__switch {
      background-color: var(--osano-switch-active-color); /* 1 */
      border-color: var(--osano-switch-active-color); /* 1 */
      &:after {
        background-color: var(--osano-btn-bg-color); /* 1 */
        border-color: var(--osano-btn-bg-color); /* 1 */
      }
    }
    /**
     * View cookies dropdown
     * ---------------------
     */
    .osano-cm-disclosure__toggle,
    .osano-cm-disclosure__toggle:hover {
      color: inherit; /* 1 */
    }
    /* 1. Fix horrible info-dialog shadow */
    .osano-cm-info {
      box-shadow: 0 0 12px 6px rgba(0, 0, 0, 0.15); /* 1. */
    }
    /**
     * 1. Hide Osano logo
     */
    .osano-cm-view__powered-by {
      display: none; /* 1 */
    }
    /**
     * Sidebar styling:
     * ----------------
     */
    .osano-cm-info-dialog__info {
      /**
       * 1. Make wider on desktop
       */
      @media screen and (min-width: 768px) {
        max-width: ${pxToRem(465)}; /* 1 */
      }
      /**
       * 1. Remove sticky behaviour
       * 2. Adjust desktop close button position based on whitespace change
       */
      .osano-cm-info-dialog-header {
        position: relative; /* 1 */
        @media screen and (min-width: 768px) {
          .osano-cm-close {
            margin-top: ${pxToRem(-30)}; /* 2 */
          }
        }
      }
      /**
       * 1. Make sidebar title bold
       * 2. Make desktop padding consistent with content
       */
      .osano-cm-info-dialog-header__header {
        font-weight: bold; /* 1 */
        @media screen and (min-width: 768px) {
          padding-top: ${pxToRem(60)}; /* 2 */
          padding-left: ${pxToRem(60)}; /* 2 */
        }
      }
      /**
       * Adjust sidebar close button focus color
       */
      .osano-cm-info-dialog-header__close:focus {
        stroke: var(--osano-close-color);
        background: var(--osano-background-color);
        border: none;
      }
      /**
       * 1. Make text more readable
       */
      .osano-cm-description {
        font-size: ${pxToRem(14)}; /* 1 */
        line-height: 1.64; /* 1 */
        font-weight: 400; /* 1 */
      }
      /**
       * 1. Add whitespace to bottom of dialog
       */
      .osano-cm-save.osano-cm-view__button {
        margin-bottom: ${pxToRem(60)}; /* 1 */
      }
    }
    /**
     * 1. Make mobile whitespace consistent
     * 2. Make desktop whitespace consistent
     */
    .osano-cm-view--type_consent {
      padding: 0 ${pxToRem(20)}; /* 1 */
      @media screen and (min-width: 768px) {
        padding: 0 ${pxToRem(60)}; /* 2 */
      }
    }
    /**
     * 1. Make section headings bold
     */
    .osano-cm-toggle__label[role="heading"] {
      font-weight: bold; /* 1 */
    }
    /**
     * 1. Make whitespace consistent with parent
     */
    .osano-cm-disclosure {
      padding-left: 0; /* 1 */
      padding-right: 0; /* 1 */
      margin-left: 0; /* 1 */
      margin-right: 0; /* 1 */
      margin-bottom: ${pxToRem(30)}; /* 1 */
    }
    /**
     * 1. Make font-size consistent
     * 2. Add preceeding dropdown arrow
     * 3. Make font color consistent
     */
    .osano-cm-disclosure__toggle,
    .osano-cm-disclosure__toggle:hover {
      font-size: ${pxToRem(14)}; /* 1 */
      position: relative; /* 2 */
      color: var(--osano-disclosure-color); /* 3 */
      text-decoration: none;
      &:before {
        display: inline-block; /* 2 */
        content: ""; /* 2 */
        position: relative; /* 2 */
        width: ${pxToRem(12.5)}; /* 2 */
        height: ${pxToRem(8.5)}; /* 2 */
        margin-right: ${pxToRem(8)}; /* 2 */
        background: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNCIgaGVpZ2h0PSIxMCIgZmlsbD0ibm9uZSI+PHBhdGggc3Ryb2tlPSIjMTIxMzI2IiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIiBzdHJva2Utd2lkdGg9IjIiIGQ9Im0yIDEuNSA1IDYgNS02Ii8+PC9zdmc+")
          center center no-repeat; /* 2 */
      }
    }
    .osano-cm-disclosure__toggle[aria-expanded=true] {
      &:before {
        background: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNCIgaGVpZ2h0PSIxMCIgZmlsbD0ibm9uZSI+PHBhdGggc3Ryb2tlPSIjMTIxMzI2IiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIiBzdHJva2Utd2lkdGg9IjIiIGQ9Im0xMiA4LjUtNS02LTUgNiIvPjwvc3ZnPg==")
      }
    }
    /**
     * 1. Override cookie widget icon with custom SVG
     */
    .osano-cm-window__widget {
      background: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgZmlsbD0ibm9uZSI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiNmZmYiLz48cGF0aCBmaWxsPSIjMDEzM0FDIiBkPSJNMTcuNjA1IDE2Ljk0NWEyLjM4IDIuMzggMCAwIDAgMS43NTUtLjcyNWMuNDgtLjQ4My43Mi0xLjA3LjcyLTEuNzZhMi4zOCAyLjM4IDAgMCAwLS43MjUtMS43NTUgMi40MDQgMi40MDQgMCAwIDAtMS43Ni0uNzIgMi4zOCAyLjM4IDAgMCAwLTEuNzU1LjcyNWMtLjQ4LjQ4My0uNzIgMS4wNy0uNzIgMS43NnMuMjQyIDEuMjc1LjcyNSAxLjc1NSAxLjA3LjcyIDEuNzYuNzJabS0zLjIgOGEyLjM4IDIuMzggMCAwIDAgMS43NTUtLjcyNWMuNDgtLjQ4My43Mi0xLjA3LjcyLTEuNzZhMi4zOCAyLjM4IDAgMCAwLS43MjUtMS43NTUgMi40MDQgMi40MDQgMCAwIDAtMS43Ni0uNzIgMi4zOCAyLjM4IDAgMCAwLTEuNzU1LjcyNWMtLjQ4LjQ4My0uNzIgMS4wNy0uNzIgMS43NnMuMjQyIDEuMjc1LjcyNSAxLjc1NSAxLjA3LjcyIDEuNzYuNzJabTEwLjM5NSAxLjUyYy40NTMgMCAuODMzLS4xNTMgMS4xNC0uNDYuMzA3LS4zMDcuNDYtLjY4Ny40Ni0xLjE0IDAtLjQ1My0uMTUzLS44MzMtLjQ2LTEuMTRhMS41NDkgMS41NDkgMCAwIDAtMS4xNC0uNDZjLS40NTMgMC0uODMzLjE1My0xLjE0LjQ2LS4zMDcuMzA3LS40Ni42ODctLjQ2IDEuMTQgMCAuNDUzLjE1My44MzMuNDYgMS4xNC4zMDcuMzA3LjY4Ny40NiAxLjE0LjQ2Wm0tNC43OSA5LjZjLTIuMTk0IDAtNC4yNjMtLjQyLTYuMjEtMS4yNmExNi4yMjcgMTYuMjI3IDAgMCAxLTUuMS0zLjQ0IDE2LjIyOCAxNi4yMjggMCAwIDEtMy40NC01LjFDNC40MiAyNC4zMTggNCAyMi4yNTIgNCAyMC4wNjVjMC0yLjQ1My41Mi00Ljc0NyAxLjU2LTYuODhzMi40MzMtMy45NCA0LjE4LTUuNDJjMS43NDctMS40OCAzLjc2LTIuNTQ3IDYuMDQtMy4yIDIuMjgtLjY1MyA0LjY0Ny0uNzQgNy4xLS4yNi0uMTYgMS4yLS4wNTMgMi4zMzMuMzIgMy40LjM3MyAxLjA2Ny45NCAxLjk3MyAxLjcgMi43MmE2Ljg4IDYuODggMCAwIDAgMi43NCAxLjY0YzEuMDY3LjM0NyAyLjE4Ny40MjcgMy4zNi4yNC0uNTMzIDEuNjI3LS4yNCAzLjA4Ny44OCA0LjM4IDEuMTIgMS4yOTMgMi40OCAyLjAwNyA0LjA4IDIuMTQuMjEzIDIuMzItLjA2IDQuNTItLjgyIDYuNmExNS45OTQgMTUuOTk0IDAgMCAxLTMuMzQgNS40OGMtMS40NjcgMS41NzMtMy4yMSAyLjgyNy01LjIzMiAzLjc2LTIuMDIuOTMzLTQuMjA3IDEuNC02LjU1OSAxLjRabS0uMDEtMi40YzMuNzg3IDAgNi45MzMtMS4yNDcgOS40NC0zLjc0IDIuNTA3LTIuNDkzIDMuOTA3LTUuNTY3IDQuMi05LjIyLTEuNDQtLjUzMy0yLjYwNy0xLjMyNy0zLjUtMi4zOGE3LjIyNyA3LjIyNyAwIDAgMS0xLjY2LTMuNjJjLTIuMTYtLjI5My0zLjk4LTEuMjI3LTUuNDYtMi44LTEuNDgtMS41NzMtMi4zMjctMy40LTIuNTQtNS40OC0xLjk3My0uMDgtMy44Mi4yNC01LjU0Ljk2LTEuNzIuNzItMy4yMTMgMS43MDctNC40OCAyLjk2YTEzLjY3OCAxMy42NzggMCAwIDAtMi45OCA0LjQyIDEzLjQxIDEzLjQxIDAgMCAwLTEuMDggNS4zYzAgMy43ODcgMS4zMiA3IDMuOTYgOS42NCAyLjY0IDIuNjQgNS44NTMgMy45NiA5LjY0IDMuOTZaIi8+PC9zdmc+")
      center center no-repeat; /* 1 */
      background-size: ${pxToRem(40)}; /* 1 */
      > svg {
        display: none; /* 1 */
      }
    }
    /**
     * 1. Remove cookie widget icon focus outline
     */
    .osano-cm-widget:focus {
      outline: none; /* 1 */
    }
    /**
     * 1. Override default close button colors
     */
    .osano-cm-dialog__close {
      color: var(--osano-close-color); /* 1 */
      stroke: var(--osano-close-color); /* 1 */
    }
  }
`

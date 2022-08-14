const FULL_HD = [1920, 1080];
const FADE_DELAY = 200;
const AUDIO_ICON = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48IS0tISBGb250IEF3ZXNvbWUgUHJvIDYuMC4wIGJ5IEBmb250YXdlc29tZSAtIGh0dHBzOi8vZm9udGF3ZXNvbWUuY29tIExpY2Vuc2UgLSBodHRwczovL2ZvbnRhd2Vzb21lLmNvbS9saWNlbnNlIChDb21tZXJjaWFsIExpY2Vuc2UpIENvcHlyaWdodCAyMDIyIEZvbnRpY29ucywgSW5jLiAtLT48cGF0aCBkPSJNMjU2IDMyQzExMi45IDMyIDQuNTYzIDE1MS4xIDAgMjg4djEwNEMwIDQwNS4zIDEwLjc1IDQxNiAyMy4xIDQxNlM0OCA0MDUuMyA0OCAzOTJWMjg4YzAtMTE0LjcgOTMuMzQtMjA3LjggMjA4LTIwNy44QzM3MC43IDgwLjIgNDY0IDE3My4zIDQ2NCAyODh2MTA0QzQ2NCA0MDUuMyA0NzQuNyA0MTYgNDg4IDQxNlM1MTIgNDA1LjMgNTEyIDM5MlYyODcuMUM1MDcuNCAxNTEuMSAzOTkuMSAzMiAyNTYgMzJ6TTE2MCAyODhMMTQ0IDI4OGMtMzUuMzQgMC02NCAyOC43LTY0IDY0LjEzdjYzLjc1QzgwIDQ1MS4zIDEwOC43IDQ4MCAxNDQgNDgwTDE2MCA0ODBjMTcuNjYgMCAzMi0xNC4zNCAzMi0zMi4wNXYtMTI3LjlDMTkyIDMwMi4zIDE3Ny43IDI4OCAxNjAgMjg4ek0zNjggMjg4TDM1MiAyODhjLTE3LjY2IDAtMzIgMTQuMzItMzIgMzIuMDR2MTI3LjljMCAxNy43IDE0LjM0IDMyLjA1IDMyIDMyLjA1TDM2OCA0ODBjMzUuMzQgMCA2NC0yOC43IDY0LTY0LjEzdi02My43NUM0MzIgMzE2LjcgNDAzLjMgMjg4IDM2OCAyODh6Ii8+PC9zdmc+";
const VIDEO_ICON = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48IS0tISBGb250IEF3ZXNvbWUgUHJvIDYuMS4xIGJ5IEBmb250YXdlc29tZSAtIGh0dHBzOi8vZm9udGF3ZXNvbWUuY29tIExpY2Vuc2UgLSBodHRwczovL2ZvbnRhd2Vzb21lLmNvbS9saWNlbnNlIChDb21tZXJjaWFsIExpY2Vuc2UpIENvcHlyaWdodCAyMDIyIEZvbnRpY29ucywgSW5jLiAtLT48cGF0aCBkPSJNNDYzLjEgMzJoLTQxNkMyMS40OSAzMi0uMDAwMSA1My40OS0uMDAwMSA4MHYzNTJjMCAyNi41MSAyMS40OSA0OCA0Ny4xIDQ4aDQxNmMyNi41MSAwIDQ4LTIxLjQ5IDQ4LTQ4di0zNTJDNTExLjEgNTMuNDkgNDkwLjUgMzIgNDYzLjEgMzJ6TTExMS4xIDQwOGMwIDQuNDE4LTMuNTgyIDgtOCA4SDU1LjFjLTQuNDE4IDAtOC0zLjU4Mi04LTh2LTQ4YzAtNC40MTggMy41ODItOCA4LThoNDcuMWM0LjQxOCAwIDggMy41ODIgOCA4TDExMS4xIDQwOHpNMTExLjEgMjgwYzAgNC40MTgtMy41ODIgOC04IDhINTUuMWMtNC40MTggMC04LTMuNTgyLTgtOHYtNDhjMC00LjQxOCAzLjU4Mi04IDgtOGg0Ny4xYzQuNDE4IDAgOCAzLjU4MiA4IDhWMjgwek0xMTEuMSAxNTJjMCA0LjQxOC0zLjU4MiA4LTggOEg1NS4xYy00LjQxOCAwLTgtMy41ODItOC04di00OGMwLTQuNDE4IDMuNTgyLTggOC04aDQ3LjFjNC40MTggMCA4IDMuNTgyIDggOEwxMTEuMSAxNTJ6TTM1MS4xIDQwMGMwIDguODM2LTcuMTY0IDE2LTE2IDE2SDE3NS4xYy04LjgzNiAwLTE2LTcuMTY0LTE2LTE2di05NmMwLTguODM4IDcuMTY0LTE2IDE2LTE2aDE2MGM4LjgzNiAwIDE2IDcuMTYyIDE2IDE2VjQwMHpNMzUxLjEgMjA4YzAgOC44MzYtNy4xNjQgMTYtMTYgMTZIMTc1LjFjLTguODM2IDAtMTYtNy4xNjQtMTYtMTZ2LTk2YzAtOC44MzggNy4xNjQtMTYgMTYtMTZoMTYwYzguODM2IDAgMTYgNy4xNjIgMTYgMTZWMjA4ek00NjMuMSA0MDhjMCA0LjQxOC0zLjU4MiA4LTggOGgtNDcuMWMtNC40MTggMC03LjEtMy41ODItNy4xLThsMC00OGMwLTQuNDE4IDMuNTgyLTggOC04aDQ3LjFjNC40MTggMCA4IDMuNTgyIDggOFY0MDh6TTQ2My4xIDI4MGMwIDQuNDE4LTMuNTgyIDgtOCA4aC00Ny4xYy00LjQxOCAwLTgtMy41ODItOC04di00OGMwLTQuNDE4IDMuNTgyLTggOC04aDQ3LjFjNC40MTggMCA4IDMuNTgyIDggOFYyODB6TTQ2My4xIDE1MmMwIDQuNDE4LTMuNTgyIDgtOCA4aC00Ny4xYy00LjQxOCAwLTgtMy41ODItOC04bDAtNDhjMC00LjQxOCAzLjU4Mi04IDcuMS04aDQ3LjFjNC40MTggMCA4IDMuNTgyIDggOFYxNTJ6Ii8+PC9zdmc+";

const TEXT_FIELDS = ["localAppLang", "lang", "localOutputPath", "congregationName", "congServer", "congServerUser", "congServerPass", "congServerPort", "congServerDir", "musicFadeOutTime", "musicVolume", "mwStartTime", "weStartTime", "obsPort", "obsPassword", "obsMediaScene", "obsCameraScene", "preferredOutput", "ppForward", "ppBackward"];
const CHECKBOXES = ["autoStartSync", "autoRunAtBoot", "enableMp4Conversion", "keepOriginalsAfterConversion", "autoQuitWhenDone", "autoOpenFolderWhenDone", "enableMusicButton", "enableMusicFadeOut", "excludeTh", "excludeLffi", "excludeLffiImages", "enableVlcPlaylistCreation", "enableMediaDisplayButton", "disableHardwareAcceleration", "enableObs", "hideMediaLogo", "ppEnable"];
const RADIO_SELECTS = ["mwDay", "weDay", "maxRes", "musicFadeOutType"];
const TIME_FIELDS = ["mwStartTime", "weStartTime"];

const PREF_FIELDS = {
  all: TEXT_FIELDS.concat(CHECKBOXES, RADIO_SELECTS, TIME_FIELDS),
  text: TEXT_FIELDS,
  checkbox: CHECKBOXES,
  radio: RADIO_SELECTS,
  time: TIME_FIELDS
};

module.exports = {
  FULL_HD,
  FADE_DELAY,
  AUDIO_ICON,
  VIDEO_ICON,
  PREF_FIELDS
};

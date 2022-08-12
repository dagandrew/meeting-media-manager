/* eslint-disable import/named */
import { type, release } from 'os'
import { Context } from '@nuxt/types'
import { MeetingFile, Perf, Stats } from '~/types'

export default function (
  { $getAllPrefs, $config, store }: Context,
  inject: (argument0: string, argument1: unknown) => void
) {
  interface Log {
    [key: number]: any[]
  }

  interface Logs {
    error: Log
    warn: Log
    info: Log
    debug: Log
  }

  const logs: Logs = {
    error: {},
    warn: {},
    info: {},
    debug: {},
  }

  function logger(type: keyof Logs, args: [msg: any, ...args: any[]]) {
    const now = +new Date()
    if (!logs[type][now]) logs[type][now] = []
    logs[type][now].push(
      typeof args[0] === 'string' ? args[0] : args[0].message
    )
    console[type].apply(console, args)
  }

  const log = {
    debug: function (msg: any, ...args: any[]) {
      logger('debug', [msg, ...args])
    },
    info: function (msg: any, ...args: any[]) {
      logger('info', [msg, ...args])
    },
    warn: function (msg: any, ...args: any[]) {
      logger('warn', [msg, ...args])
    },
    error: function (msg: any, ...args: any[]) {
      logger('error', [msg, ...args])
    },
  }

  inject('log', log)

  const bugURL = () => {
    const prefs = JSON.stringify(
      Object.fromEntries(
        Object.entries($getAllPrefs()).map(([scope, prefs]) => {
          return [
            scope,
            Object.fromEntries(
              Object.entries(prefs).map(([key, value]) => {
                if (value) {
                  if (scope === 'cong') value = '***'
                  if (key === 'localOutputPath') value = '***'
                  if (key === 'password' || key === 'port') value = '***'
                }
                return [key, value]
              })
            ),
          ]
        })
      ),
      null,
      2
    )
    return (
      `${$config.repo}/issues/new?labels=bug,from-app&title=ISSUE DESCRIPTION HERE&body=` +
      encodeURIComponent(
        `### Describe the bug
A clear and concise description of what the bug is.

### To Reproduce
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. Do '....'
4. See error

### Expected behavior
A clear and concise description of what you expected to happen.

### Screenshots
If possible, add screenshots to help explain your problem.

### System specs
- ${type()} ${release()}
- M³ ${$config.version}

### Additional context
Add any other context about the problem here.

### Anonymized \`prefs.json\`
\`\`\`
${prefs}
\`\`\`

### Full error log
\`\`\`
${JSON.stringify(logs.error, null, 2)}
\`\`\``
      ).replace(/\n/g, '%0D%0A')
    )
  }

  inject('bugURL', bugURL)

  inject('printStats', () => {
    const performance = store.state.stats.performance as Map<string, Perf>
    const downloads = store.state.stats.downloads as Stats
    for (const [func, perf] of [...performance.entries()].sort(
      (a, b) => a[1].stop - b[1].stop
    )) {
      // log.info("%c[perf] [" + perfItem[0] + "] " + (perfItem[1].stop - perfItem[1].start).toFixed(1) + "ms", "background-color: #e2e3e5; color: #41464b;");
      log.info(
        `%c[perf] [${func}] ${(perf.stop - perf.start).toFixed(1)}ms`,
        'background-color: #e2e3e5; color: #41464b;'
      )
    }

    for (const [origin, sources] of Object.entries(downloads)) {
      for (const [source, files] of Object.entries(sources)) {
        // log.info("%c[perf] [" + downloadSource[0] + "Fetch] " + Object.entries(downloadSource[1]).sort((a,b) => a[0].localeCompare(b[0])).map(downloadOrigin => "from " + downloadOrigin[0] + ": " + (downloadOrigin[1].map(source => source.filesize).reduce((a, b) => a + b, 0) / 1024 / 1024).toFixed(1) + "MB").join(", "), "background-color: #fbe9e7; color: #000;");
        log.info(
          `%c[perf] [${origin} Fetch] from ${source}: ${(
            (files as MeetingFile[])
              .map((file) => file.filesize as number)
              .reduce((a, b) => a + b, 0) /
            1024 /
            1024
          ).toFixed(1)}MB`,
          'background-color: #fbe9e7; color: #000;'
        )
      }
    }
  })
}

// https://zenn.dev/yusukeiwaki/scraps/00fd022cb857e0
// After running this script, start Firefox using launch.sh.
import { createProfile } from '@puppeteer/browsers';

await createProfile('firefox', {
  path: '/app/examples/my_prefs',
  preferences: {
      'remote.active-protocols': 1,
      'fission.webContentIsolationStrategy': 0,
  }
})

console.log("DONE")

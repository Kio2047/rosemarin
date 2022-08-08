//https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation
//'Module Augmentation'

//This tells the compiler that the session contains also a 'sid' property. So it doesn't complain

import 'express-session';

declare module 'express-session' {
  export interface Session {
    sid?: number
  }
}

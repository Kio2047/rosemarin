//https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation
//'Module Augmentation'

//This tells the compiler that the session contains also a 'sid' property. So it doesn't complain

declare module 'express-session' {
  interface SessionData {
    sid?: number
  }
}

export {};
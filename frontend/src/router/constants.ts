export const enum Routes {
  INDEX = "/",

  LOGIN = "/login",

  REGISTER = "/register",

  MAIN = "/main",

  MAIN_BOARDS = Routes.MAIN + "/boards",

  MAIN_BOARD = Routes.MAIN_BOARDS + "/:id",
}

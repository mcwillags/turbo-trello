import { BoardStore } from "./BoardStore.ts";
import { ListStore } from "./ListStore.ts";
import { TaskStore } from "./TaskStore.ts";
import { UserStore } from "./UserStore.ts";

export class RootStore {
  private readonly _userStore: UserStore;
  private readonly _boardStore: BoardStore;
  private readonly _listStore: ListStore;
  private readonly _taskStore: TaskStore;

  constructor() {
    this._userStore = new UserStore();
    this._boardStore = new BoardStore();
    this._listStore = new ListStore();
    this._taskStore = new TaskStore();
  }

  get userStore(): UserStore {
    return this._userStore;
  }

  get boardStore(): BoardStore {
    return this._boardStore;
  }

  get listStore(): ListStore {
    return this._listStore;
  }

  get taskStore(): TaskStore {
    return this._taskStore;
  }
}

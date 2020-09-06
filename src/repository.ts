interface requireCRUD {
  id: string;
  [prop: string]: string;
}

export default class Repository<T extends requireCRUD> {
  constructor(private key: string) {}

  store(data: T) {
    const localStrageData = localStorage.getItem(this.key);
    //新規の場合
    if (!localStrageData || localStrageData.length <= 2) {
      let saveData = [];
      data.id = "1";
      saveData.push(data);
      localStorage.setItem(this.key, JSON.stringify(saveData));
      return;
    }

    //追加の場合
    const _localStrageData: T[] = [
      ...JSON.parse(localStorage.getItem(this.key)!),
    ];
    const ids = _localStrageData.map((data) => {
      return +data.id;
    });
    data.id = String(
      Math.max.apply(
        null,
        _localStrageData.map((data) => {
          return +data.id;
        })
      ) + 1
    );
    const upDatelocalStrageData = [..._localStrageData, data];
    localStorage.setItem(this.key, JSON.stringify(upDatelocalStrageData));
    return;
  }

  update(data: T) {
    const localStrageData: T[] =
      [...JSON.parse(localStorage.getItem(this.key)!)] || [];
    localStrageData.forEach((localStorageData: T) => {
      if (localStorageData.id == data.id) {
        Object.keys(data).map((key: keyof T) => {
          localStorageData[key] = data[key];
        });
      }
    });
    localStorage.setItem(this.key, JSON.stringify(localStrageData));
  }

  delete(id: string) {
    const localStrageData: T[] =
      [...JSON.parse(localStorage.getItem(this.key)!)] || [];
    let _localStrageData: T[] = [];
    localStrageData.forEach((localStorageData) => {
      if (localStorageData.id != id) {
        _localStrageData.push(localStorageData);
      }
    });
    localStorage.setItem(this.key, JSON.stringify(_localStrageData));
  }

  //リスクあるので実装しない
  deleteAll() {
    // localStorage.removeItem(this.key)
  }

  get getAll() {
    const localStrageData = localStorage.getItem(this.key);
    if (!localStrageData) return;
    return JSON.parse(localStrageData);
  }
}

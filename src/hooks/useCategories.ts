import * as React from "react";

export type TCategory = {
    id: number;
    name: string;
};

export class Category {
    id = 0;
    name = "";

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }

    toJson() {
        return {
            id: this.id,
            name: this.name,
        };
    }
}

class Categories {
    private static _instance: Categories = new Categories();

    items: Category[] = [];

    constructor() {
        if (typeof Categories._instance === "object") {
            return Categories._instance;
        }

        Categories._instance = this;
        return this;
    }

    getLastId() {
        return this.items[this.items.length - 1]?.id || 0;
    }

    addCategory(category: Category) {
        this.items.push(category);
    }

    toJson(){
        return this.items;
    }
}

const useCategories = () => {
    const categories = React.useMemo(() => {
        const categories = new Categories();
        // TODO: удалить
        // @ts-ignore
        window.categories = categories;
        return categories;
    }, []);
    const [items, setItems] = React.useState(categories.items);

    const updateItems = React.useCallback(() => {
        setItems([...categories.items]);
    }, [categories]);

    const addCategory = React.useCallback(
        (name: string) => {
            const lastId = categories.getLastId();
            categories.addCategory(new Category(lastId + 1, name));
            updateItems();
        },
        [categories, updateItems]
    );
    return { addCategory, items };
};

export default useCategories;

type CardMaker = {
    readonly canvas: Canvas,
    readonly allFilters: Filter[],
    readonly selectedElements: number[],
    readonly history: ActionHistory,
    readonly templates: Template[],
}

type Canvas = {
    readonly width: number,
    readonly height: number,
    readonly currentFilter: Filter,
    readonly elementList: elementList[];
    readonly background: Background,
}

type elementList = ImgElement | TextElement

type ActionHistory = {
    readonly listState: Canvas[],
    readonly currentIndex: number,
}

type Template = {
    readonly name: string,
    readonly src: string | null,
}

type ImgElement = {
    readonly src: string | null,
} & Component

type TextElement = {
    readonly text: string,
    readonly size: number,
    readonly color: string,
    readonly bold: boolean,
    readonly italic: boolean,
    readonly underline: boolean,
    readonly fontFamily: string,
} & Component

type Component = {
    readonly id: number,
    readonly width: number,
    readonly height: number,
    readonly posX: number,
    readonly posY: number,
    readonly type: string,
}

type Background = {
    readonly src: string | null,
}

type Filter = {
    readonly name: string,
    readonly color: string,
    readonly transparency: number,
}

function createCanvas(cardmaker: CardMaker): CardMaker {
    return {
        ...cardmaker,
        canvas: {
            width: 600,
            height: 800,
            currentFilter: {
                name: 'black',
                color: 'ffff1f',
                transparency: 20,
            },
            elementList: [],
            background: {
                src: 'fff2ff',
            },
        },
    };
}

function editCanvasSize(cardmaker: CardMaker, width: number, height: number): CardMaker {
    return {
        ...cardmaker,
        canvas: {
            ...cardmaker.canvas,
            width: width,
            height: height,
        },
    };
}

function installFilter(cardmaker: CardMaker, nameFilter: string): CardMaker {
    let _filter: Filter
    cardmaker.allFilters.forEach(function (filter) {
        if (filter.name == nameFilter) {
            _filter = {
                name: filter.name,
                color: filter.color,
                transparency: filter.transparency,
            }
        }; 
    });
    return {
        ...cardmaker,
        canvas: {
            ...cardmaker.canvas,
            currentFilter: {..._filter}
        },
    };
}

function selectingComponents(cardmaker: CardMaker, elementsId: number[]): CardMaker {
    return {
        ...cardmaker,
        selectedElements: elementsId,
    };
}

function resetSelectionComponents(cardmaker: CardMaker): CardMaker {
    return {
        ...cardmaker,
        selectedElements: [],
    };
}

function editBackground(cardmaker: CardMaker, src: string): CardMaker {
    return {
        ...cardmaker,
        canvas: {
            ...cardmaker.canvas,
            background: {
                src: src,
            },
        },
    };
}

function resetBackground(cardmaker: CardMaker): CardMaker {
    return {
        ...cardmaker,
        canvas: {
            ...cardmaker.canvas,
            background: {
                src: null,
            },
        },
    };
}

function createTextElement(cardmaker: CardMaker, newId: number): CardMaker {
    return {
        ...cardmaker,
        canvas: {
            ...cardmaker.canvas,
            elementList: [
                ...cardmaker.canvas.elementList,
                {
                    id: newId,
                    width: 100,
                    height: 220,
                    posX: cardmaker.canvas.width / 2,
                    posY: cardmaker.canvas.height / 2,
                    type: 'text',
                    text: 'Hello, guy!',
                    size: 20,
                    color: '#ffffff',
                    bold: true,
                    italic: true,
                    underline: false,
                    fontFamily: 'Arial',
                },
            ],
        },
    };
}

function editSizeObject(cardmaker: CardMaker, id: number, width: number, height: number) {
    return {
        ...cardmaker,
        canvas: {
            ...cardmaker.canvas,
            elementList: cardmaker.canvas.elementList.map(element => {
                if (element.id == id) {
                    return {
                        ...element,
                        width: width,
                        height: height,
                    }
                }
                return {...element}
            })
        }
    };
}

function editTextElement(cardmaker: CardMaker, elementId: number, text: string): CardMaker {
    return {
        ...cardmaker,
        canvas: {
            ...cardmaker.canvas,
            elementList: cardmaker.canvas.elementList.map(element => {
                if (element.id == elementId) {
                    return {
                        ...element,
                        text: text,
                    }
                }
                return {...element}
            })
        },   
    };
}

function setBoldText(cardmaker: CardMaker, elementId: number, isBold: boolean): CardMaker {
    return {
        ...cardmaker,
        canvas: {
            ...cardmaker.canvas,
            elementList: cardmaker.canvas.elementList.map(element => {
                if (element.id == elementId) {
                    return {
                        ...element,
                        bold: isBold,
                    }
                }
                return {...element}
            })
        },
    };
}

function setItalicText(cardmaker: CardMaker, elementId: number, isItalic: boolean): CardMaker {
    return {
        ...cardmaker,
        canvas: {
            ...cardmaker.canvas,
            elementList: cardmaker.canvas.elementList.map(element => {
                if (element.id == elementId) {
                    return {
                        ...element,
                        italic: isItalic,
                    }
                }
                return {...element}
            })
        },
    };
}

function setUnderlineText(cardmaker: CardMaker, elementId: number, isUnderline: boolean): CardMaker {
    return {
        ...cardmaker,
        canvas: {
            ...cardmaker.canvas,
            elementList: cardmaker.canvas.elementList.map(element => {
                if (element.id == elementId) {
                    return {
                        ...element,
                        underline: isUnderline,
                    }
                }
                return {
                    ...element
                }
            })
        },
    };
}

function editSizeText(cardmaker: CardMaker, elementId: number, size: number): CardMaker {
    return {
        ...cardmaker,
        canvas: {
            ...cardmaker.canvas,
            elementList: cardmaker.canvas.elementList.map(element => {
                if (element.id == elementId) {
                    return {
                        ...element,
                        size: size
                    }
                }
                return {...element}
            })
        },
    };
}

function editTextColor(cardmaker: CardMaker, elementId: number, color: string): CardMaker {
    return {
        ...cardmaker,
        canvas: {
            ...cardmaker.canvas,
            elementList: cardmaker.canvas.elementList.map(element => {
                if (element.id == elementId) {
                    return {
                        ...element,
                        color: color
                    }
                }
                return {...element}
            })
        },
    };
}

function addImgElement(cardmaker: CardMaker, elementId: number, src: string, width: number, height: number): CardMaker {
    return {
        ...cardmaker,
        canvas: {
            ...cardmaker.canvas,
            elementList: [
                ...cardmaker.canvas.elementList,
                {
                    id: elementId,
                    width: width,
                    height: height,
                    posX: cardmaker.canvas.width / 2,
                    posY: cardmaker.canvas.height / 2,
                    type: 'img',
                    src: src,
                },
            ],
        },
    };
}

function deleteComponents(cardmaker: CardMaker): CardMaker {
    let _elementList = [...cardmaker.canvas.elementList];

    cardmaker.selectedElements.forEach(function (elementId) {
        _elementList.splice(elementId, 1); //*
    });
    return {
        ...cardmaker,
        canvas: {
            ...cardmaker.canvas,
            elementList: [
                ..._elementList,
            ],
        },
    };
}

function moveComponents(cardmaker: CardMaker, newX: number, newY: number): CardMaker {
    let _elementList = [...cardmaker.canvas.elementList];
    
    cardmaker.selectedElements.forEach(function (elementId) {
        _elementList.splice(elementId, 1,
            {
                ...cardmaker.canvas.elementList[elementId],
                posX: cardmaker.canvas.elementList[elementId].posX + newX,
                posY: cardmaker.canvas.elementList[elementId].posY + newY,
            }
        );
    });
    return {
        ...cardmaker,
        canvas: {
            ...cardmaker.canvas,
            elementList: [
                ..._elementList,
            ],
        },
    };
}

function undo(cardmaker: CardMaker): CardMaker {
    return {
        ...cardmaker,
        history: {
            ...cardmaker.history,
            currentIndex: cardmaker.history.currentIndex - 1,
        }
    }
}

function redo(cardmaker: CardMaker): CardMaker {
    return {
        ...cardmaker,
        history: {
            ...cardmaker.history,
            currentIndex: cardmaker.history.currentIndex + 1,
        }
    }
}

function addCanvasInHistory(cardmaker: CardMaker, canvas: Canvas): CardMaker {
    let _history: ActionHistory = cardmaker.history;
    let _listState: Canvas[] = [..._history.listState];
    if (_history.currentIndex !== _history.listState.length - 1) {
        _listState.splice(_history.currentIndex + 1, _history.listState.length);
    }
    _listState.push(canvas);
    return {
        ...cardmaker,
        history: {
            listState: _listState,
            currentIndex: _history.currentIndex + 1,
        }
    }
}

function applyTemplate(cardmaker: CardMaker, template: string): CardMaker {
    return {
        ...cardmaker,
        canvas: JSON.parse(template),
    }
}
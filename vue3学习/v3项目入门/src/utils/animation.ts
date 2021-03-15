interface Options {
    el: HTMLElement,
    property: string,
    start: number,
    end: number,
    time: number,
    callback?: () => void
}

/**
 * 修改元素的属性
 * @param el html 元素
 * @param property style 上的属性
 * @param value 属性的值
 */
const setStyle = (el: HTMLElement, property: string, value: string | number) => {
    el.style[property] = value + 'px';
};

/**
 * 执行动画过渡
 * @param el 需要执行动画的元素
 * @param property 修改 style 的属性名
 * @param start 动画起始位置
 * @param end 动画结束位置
 * @param time 动画执行时间
 * @param callback 动画执行结束后的回调
 */
export default function animation ({
                    el,
                    property,
                    start,
                    end,
                    time,
                    callback
                }: Options) {
    if (start === end) {
        return;
    }
    const step = Math.abs(start - end) / time;
    const getEndFn = end > start ? Math.min : Math.max;
    const getNextFn = (end > start
            ? (time: number) => time * step
            : (time: number) => (start - time * step)
    );
    const isEnd = (end > start
            ? (value) => value >= end
            : (value) => value <= end
    );
    let startTime: number;
    const fn = (timestamp: number) => {
        if (!startTime) {
            startTime = timestamp;
        }
        const l = getNextFn(timestamp - startTime);
        setStyle(el, property, getEndFn(end, l));
        if (isEnd(l)) {
            callback && callback();
        } else {
            window.requestAnimationFrame(fn);
        }
    };
    window.requestAnimationFrame(fn);
}
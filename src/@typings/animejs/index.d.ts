declare module "animejs" {
    interface IAnimeJS<T, K extends keyof T> {
        targets: T;
        translateX?: number;
        duration?: number;
        endDelay?: number;
        direction?: string;
        easing?:
            | "linear"
            | "easeInCubic"
            | "easeOutCubic"
            | "easeInOutCubic"
            | "easeInQuart"
            | "easeOutQuart"
            | "easeInOutQuart"
            | "easeInQuint"
            | "easeOutQuint"
            | "easeInOutQuint"
            | "easeInSine"
            | "easeOutSine"
            | "easeInOutSine"
            | "easeInExpo"
            | "easeOutExpo"
            | "easeInOutExpo"
            | "easeInCirc"
            | "easeOutCirc"
            | "easeInOutCirc"
            | "easeInBack"
            | "easeOutBack"
            | "easeInOutBack";
        loop?: boolean;
        update: () => void;
        round: number;
    }

    interface ITimeline {
        duration?: number;
    }

    class Anime<T = string> {
        constructor(parameters: IAnimeJS<T>);
        timeline: (parameters: ITimeline) => void;
    }

    export = Anime;
}

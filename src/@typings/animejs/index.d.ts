declare module "animejs" {
    interface Options<T> {
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
    interface Timeline {
        duration?: number;
    }

    interface Instance {
        reset(): void;
        passThrough: boolean;
        currentTime: number;
        progress: number;
    }

    function Anime<T = string>(parameters: Options<T> | T): Instance;

    namespace Anime {
        function timeline(): void;
    }

    export = Anime;
}

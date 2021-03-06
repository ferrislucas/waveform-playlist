import {pixelsToSeconds} from '../../utils/conversions';

export default class {
    constructor(track, samplesPerPixel, sampleRate) {
        this.track = track;
        this.samplesPerPixel = samplesPerPixel;
        this.sampleRate = sampleRate;
    }

    mousedown(e) {
        e.preventDefault();

        let el = e.target;
        var prevX = e.offsetX;

        let emitShift = (x) => {
            let deltaX = x - prevX;
            let deltaTime = pixelsToSeconds(deltaX, this.samplesPerPixel, this.sampleRate);
            prevX = x;
            this.track.ee.emit('shift', deltaTime, this.track);
        };

        //dynamically put an event on the element.
        el.onmousemove = (e) => {
            e.preventDefault();
            emitShift(e.offsetX);
        };

        let complete = (e) => {
            e.preventDefault();
            emitShift(e.offsetX);
            el.onmousemove = el.onmouseup = el.onmouseleave = null;
        };

        el.onmouseup = el.onmouseleave = complete;
    }

    getClasses() {
        return ".state-shift";
    }

    getEvents() {
        return {
            "mousedown": this.mousedown
        }
    }
}
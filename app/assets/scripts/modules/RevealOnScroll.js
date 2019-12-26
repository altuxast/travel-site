import throttle from 'lodash/throttle';
import debounce from 'lodash/debounce';

class RevealOnScroll {
    constructor(ls, thresholdPercent) {
        this.itemsToReveal = ls;
        this.thresholdPercent = thresholdPercent;
        this.browserHeight = window.innerHeight;
        this.hideInitially();
        this.scrollThrottle = throttle(this.calcCaller, 200).bind(this);
        this.events();
    }

    events() {
        window.addEventListener('scroll', this.scrollThrottle);
        window.addEventListener('resize', debounce(() => {
            console.log('resize just ran');
            this.browserHeight = window.innerHeight;
        }, 333))
    }

    calcCaller() {
        console.log('scroll function ran');
        this.itemsToReveal.forEach(l => {
            if(l.isRevealed == false) {
                this.calculateIfScrolledTo(l);
            }
        });
    }

    calculateIfScrolledTo(l) {
        if(window.scrollY + this.browserHeight > l.offsetTop) {
            console.log('element was calculated');
            let scrollPercent = (l.getBoundingClientRect().y / this.browserHeight) * 100;
            if(scrollPercent < this.thresholdPercent) {
                l.classList.add('reveal-item--is-visible');
                l.isRevealed = true;
                if(l.isLastItem === true) {
                    window.removeEventListener('scroll', this.scrollThrottle);
                }
            }
        }
    }

    hideInitially() {
        this.itemsToReveal.forEach(
            l => {
                l.classList.add('reveal-item');
                l.isRevealed = false;
        });
        this.itemsToReveal[this.itemsToReveal.length -1].isLastItem = true;
    }

    revealItem() {
        this.itemsToReveal.forEach(
            l => l.classList.add('reveal-item--is-visible')
        );
    }
}

export default RevealOnScroll;
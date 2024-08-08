<script>
    export default {
        
        data() {
            return {
            scrollPosition: 0,
            contentWrapperTop: 0
            };
        },
        computed: {
            heroStyle() {
            // const backgroundSize = 100 + parseInt(this.scrollPosition / 3) + '%';
            // return {
            //     backgroundSize: backgroundSize
            // };
            const backgroundPosition = `calc(30% + ${this.scrollPosition / 3}px) 30%`;
                return {
                    // backgroundSize: '100%',
                    backgroundPosition: backgroundPosition
                };
            },
            heroTop() {
            return 50 + this.scrollPosition * 0.01 + '%';
            },
            heroOpacity() {
            return 1 - this.scrollPosition * 0.003;
            },
            navBgClass() {
            return {
                'bg-hidden': this.scrollPosition < this.contentWrapperTop - 300,
                'bg-visible': this.scrollPosition >= this.contentWrapperTop - 300
            };
            }
        },
        mounted() {
            this.contentWrapperTop = this.$refs.contentWrapper.offsetTop;
            window.addEventListener('scroll', this.handleScroll);
            this.backgroundInterval = setInterval(this.changeBackgroundImage, 1000);
        },
        beforeDestroy() {
            window.removeEventListener('scroll', this.handleScroll);
        },
        methods: {
            handleScroll() {
                this.scrollPosition = window.scrollY;
            },
            changeBackgroundImage() {
                this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
            },
        }
    };
</script>

<template>
  <div>
    <div class="hero" :style="heroStyle">
      <h1 :style="{ top: heroTop, opacity: heroOpacity }">臭卯咪</h1>
    </div>
    <div class="hero2" :style="heroStyle">
      <h1 :style="{ top: heroTop, opacity: heroOpacity }">臭卯咪</h1>
    </div>
    <div class="content-wrapper" ref="contentWrapper">
      <h1>Some Title</h1>
      <p>Cray marfa artisan mlkshk tote bag. Freegan man braid master cleanse, pork belly retro artisan man bun hammock cronut quinoa roof party. Pop-up cardigan poutine meditation, affogato stumptown wolf fashion axe pug. Listicle paleo seitan keytar, twee kinfolk salvia meggings cold-pressed retro fingerstache typewriter organic cred. Tacos church-key gochujang, swag ugh squid put a bird on it VHS fingerstache ennui cardigan craft beer. Taxidermy beard you probably haven't heard of them four dollar toast PBR&B. Poutine lo-fi blue bottle, twee hammock sriracha godard.</p>
    </div>
    <h1>{{scrollPosition}}</h1>
  </div>
</template>


<style scoped lang="scss">

*{
    font-family: "Zen Maru Gothic", serif;
}

.hero {
  position: relative;
  width: 100%;
  height: 600px;
  background: rgb(50, 50, 50);
  background: url("../src/assets/catAnimate/cat1.png") no-repeat 50% -100% fixed;
  background-size: 50%;
  background-color: black;
  overflow: hidden;

  h1 {
    position: absolute;
    top: 50%;
    left: 60%;
    width: 100%;
    padding: .5em;
    font-size: 5em;
    font-weight: lighter;
    color: white;
}

}

.hero2 {
  position: relative;
  width: 100%;
  height: 600px;
  background: rgb(50, 50, 50);
  background: url("../src/assets/catAnimate/cat1.png") no-repeat 50% 30% fixed;
  background-size: 50%;
  background-color: black;
  overflow: hidden;

  h1 {
    position: absolute;
    top: 50%;
    left: 60%;
    width: 100%;
    padding: .5em;
    font-size: 5em;
    font-weight: lighter;
    color: white;
    }
}

</style>
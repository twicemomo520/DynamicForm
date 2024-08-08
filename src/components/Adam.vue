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
            const backgroundPosition = `calc(30% - ${this.scrollPosition / 3}px) 30%`;
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
        },
        beforeDestroy() {
            window.removeEventListener('scroll', this.handleScroll);
        },
        methods: {
            handleScroll() {
            this.scrollPosition = window.scrollY;
            }
        }
    };
</script>

<template>
  <div>
    <!-- <nav>
      <div :class="navBgClass"></div>
      <ul>
        <li><a href="#">Link</a></li>
        <li><a href="#">Link</a></li>
        <li><a href="#">Link</a></li>
        <li><a href="#">Link</a></li>
      </ul>
    </nav> -->
    <div class="hero" :style="heroStyle">
      <h1 :style="{ top: heroTop, opacity: heroOpacity }">女鬼橋</h1>
    </div>
    <div class="hero2" :style="heroStyle">
      <h1 :style="{ top: heroTop, opacity: heroOpacity }">女鬼橋</h1>
    </div>
    <div class="content-wrapper" ref="contentWrapper">
      <h1>Some Title</h1>
      <p>Cray marfa artisan mlkshk tote bag. Freegan man braid master cleanse, pork belly retro artisan man bun hammock cronut quinoa roof party. Pop-up cardigan poutine meditation, affogato stumptown wolf fashion axe pug. Listicle paleo seitan keytar, twee kinfolk salvia meggings cold-pressed retro fingerstache typewriter organic cred. Tacos church-key gochujang, swag ugh squid put a bird on it VHS fingerstache ennui cardigan craft beer. Taxidermy beard you probably haven't heard of them four dollar toast PBR&B. Poutine lo-fi blue bottle, twee hammock sriracha godard.</p>
      
      <p>Cardigan DIY dreamcatcher stumptown. Brunch yuccie swag, selfies leggings echo park quinoa cred squid cray typewriter. Tofu crucifix small batch typewriter irony, blog iPhone cold-pressed tousled pork belly polaroid. Direct trade heirloom deep v chicharrones kale chips. 8-bit viral kale chips food truck chillwave pork belly, art party cornhole hoodie banjo freegan. Tacos vice selfies, wolf tumblr vinyl affogato leggings sartorial forage plaid deep v cronut schlitz you probably haven't heard of them. Meditation normcore fap, pork belly 3 wolf moon pabst next level tacos gochujang franzen.</p>
      
      <p>Ethical keytar slow-carb forage before they sold out meggings. Kombucha church-key kickstarter, pork belly scenester beard ugh ennui ramps gochujang pop-up chambray retro tacos messenger bag. Lo-fi pour-over tote bag migas brunch deep v shoreditch slow-carb before they sold out selfies. Meh hashtag kombucha ennui venmo. Lo-fi seitan normcore hoodie biodiesel celiac. Pickled master cleanse kitsch tofu, freegan vinyl letterpress. Tote bag banjo 90's, brunch XOXO retro cred seitan venmo master cleanse.</p>
    </div>
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
  background: url(https://s.yimg.com/ny/api/res/1.2/zsbP9f1NY2nwkjJ35DrvQg--/YXBwaWQ9aGlnaGxhbmRlcjt3PTk2MDtoPTY0MDtjZj13ZWJw/https://s.yimg.com/os/creatr-uploaded-images/2023-12/2ca12210-925f-11ee-9afd-6f7af315dcee) no-repeat 50% 30% fixed;
  background-size: 100%;
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
  background: url(https://s.yimg.com/ny/api/res/1.2/zsbP9f1NY2nwkjJ35DrvQg--/YXBwaWQ9aGlnaGxhbmRlcjt3PTk2MDtoPTY0MDtjZj13ZWJw/https://s.yimg.com/os/creatr-uploaded-images/2023-12/2ca12210-925f-11ee-9afd-6f7af315dcee) no-repeat 50% 30% fixed;
  background-size: 100%;
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
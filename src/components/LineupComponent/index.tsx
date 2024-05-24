import { useEffect } from "preact/hooks";
import $ from "jquery";
import Velocity from "velocity-animate";
import "./lineupComponent.scss";
import FlagLeft from "../../../public/flag-left.png";
import FlagRight from "../../../public/flag-right.png";
import {RESOURCE_URL} from "../../utils/contants";
import { I18n } from "react-redux-i18n";
import NoDataElement from "../NoDataComponent";

export function Lineup(props) { 
  const {lineUps} = props;
  console.log(lineUps);
  
  if(lineUps === ''){
    return(<NoDataElement/>)
  }
  var $closeBtn,
    $heading,
    $loadBtn,
    $loading,
    $players,
    $playersAway,
    $playersHome,
    $stage,
    $subHeading,
    $switchBtn,
    $switcher,
    $team,
    $teamListHome,
    $terrain,
    $world,
    ASSET_URL,
    anim,
    data,
    dom,
    events,
    init,
    pos,
    scenes,
    state,
    PATH;

  ASSET_URL = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/215059/";

  useEffect(
    () => {
      $stage = $(".js-stage");
      $world = $(".js-world");
      $switchBtn = $(".js-switch");
      $loadBtn = $(".js-load");
      $heading = $(".js-heading");
      $switcher = $(".js-switcher");
      $closeBtn = $(".js-close");
      $subHeading = $(".js-subheading");
      $terrain = $(".js-terrain");
      $team = $(".js-team");
      $teamListHome = $(".js-team-home");
      $loading = $(".js-loading");
      dom.addPlayers("home");
      dom.addPlayers("away");
      scenes.preLoad();
      // scenes.arrangePlayers();
      events.attachAll();
      return scenes.startLoading();
  },[]);

  $stage = null;

  $world = null;

  $terrain = null;

  $team = null;

  $teamListHome = null;

  $players = null;

  $playersHome = null; // Subset of $players

  $playersAway = null; // Subset of $players

  $switchBtn = null;

  $loadBtn = null;

  $closeBtn = null;

  $heading = null;

  $subHeading = null;

  $loading = null;

  $switcher = null;

  const generatePlayers = (lineup) => lineup.map((player) => ({
    name: player.name,
    asset:
      "https://s3-us-west-2.amazonaws.com/s.cdpn.io/215059/bm-pizarro.jpg",
    origin: "Peru",
    height: "1.84m",
    number: player.number,
    pos: player.position,
    dob: "36",
    goals: 1,
    games: 16,
}))

  data = {
    players: {
      home: generatePlayers(lineUps[0].homeLineup),
      away: generatePlayers(lineUps[0].awayLineup),
    },
  };

  state = {
    home: true,
    disabHover: false,
    swapSides: function () {
      if (this.home) {
        return (this.home = false);
      } else {
        return (this.home = true);
      }
    },
    curSide: function () {
      if (this.home) {
        return "home";
      } else {
        return "away";
      }
    },
  };

  pos = {
    world: {
      baseX: 0,
      baseY: 0,
      baseZ: -580,
    },
    def: {
      goalie: [0, -50],
    },
  };

  dom = {
    addPlayers: function (side) {
      var $el, key, ref, val, depth, current_axis;
      ref = data.players[side];

      ref.sort((a, b) => b.pos - a.pos);

      depth = Math.max(...ref.map((player) => player.pos));

      var $team_side = $("<div></div>").addClass(
        "team-template align-items-center d-flex justify-content-between pt-3 pb-3"
      );
      let currentLineId = $;
      let currentLineNum = 0;
      if (depth >= 5) {
        current_axis = -410;
      } else if (depth == 4) {
        current_axis = -350;
      } else if (depth == 3) {
        current_axis = -300;
      }

      for (key in ref) {
        val = ref[key];
        val.side = side;
        let playerPos = val.pos;
        $el = this.addPlayer(val);
        if (currentLineNum != playerPos) {
          const newTemplate = $("<div></div>").addClass(
            "players-row d-flex justify-content-around h-100"
          );
          newTemplate.attr("data-axis", current_axis);
          newTemplate.append($el);

          $team_side.append(newTemplate);

          currentLineId = newTemplate;

          currentLineNum = playerPos;

          current_axis += 100;
        } else {
          currentLineId.append($el);
          $team_side.append(currentLineId);
        }
      }

      $team.append($team_side);

      $players = $(".js-player");
      $playersHome = $('.js-player[data-side="home"]');
      return ($playersAway = $('.js-player[data-side="away"]'));
    },
    addPlayer: function (data) {
      var $el;
      $el = $(
        '<div class="js-player player" data-name="' +
          data.name +
          '" data-side="' +
          data.side +
          '"></div>'
      );
      $el.append(
        '<div class="player__label"><span>' +
          data.number +
          ". " +
          data.name +
          "</span></div>"
      );
      $el.append(
        '<div class="player__img"><img src= ' + data.asset + "></div>"
      );
      $el.prepend('<div class="player__card"> </div>');
      $el.prepend('<div class="player__placeholder"></div>');
      this.populateCard($el.find(".player__card"), data);
      return $el;
    },
    //   lineupsTemplate:  function(formation, startXI, team) {

    //     const teamTemplate = document.createElement('div')
    //     teamTemplate.classList = 'team-template align-items-center d-flex justify-content-between pt-3 pb-3'

    //     const layerClassList = 'align-items-center d-flex flex-column justify-content-around h-100'

    //     let currentLineId = '';
    //     let currentLineNum = 0;
    //     startXI.forEach((player) => {
    //         let playerPos = player.player.grid.split(':')[0];

    //         if(currentLineNum != playerPos) {
    //             const newTemplate = document.createElement('div')
    //             newTemplate.classList = layerClassList

    //             oddsTable.generatePlayerTemplate(player, newTemplate)

    //             teamTemplate.appendChild(newTemplate)
    //             currentLineId = newTemplate
    //             currentLineNum = playerPos
    //         } else {
    //             oddsTable.generatePlayerTemplate(player, currentLineId)
    //         }
    //     });

    //     team.appendChild(teamTemplate)
    // },
    preloadImages: function (preload) {
      var i, promises;
      promises = [];
      i = 0;
      while (i < preload.length) {
        (function (url, promise) {
          var img;
          img = new Image();
          img.onload = function () {
            return promise.resolve();
          };
          return (img.src = url);
        })(preload[i], (promises[i] = $.Deferred()));
        i++;
      }
      return $.when.apply($, promises).done(function () {
        scenes.endLoading();
        return scenes.loadIn(1600);
      });
    },
    populateCard: function ($el, data) {
      return $el.append(
        "<h3>" +
          data.name +
          "</h3>" +
          '<ul class="player__card__list"><li><span>DOB</span><br/>' +
          data.dob +
          " yr</li><li><span>Height</span><br/>" +
          data.height +
          "</li><li><span>Origin</span><br/>" +
          data.origin +
          "</li></ul>" +
          '<ul class="player__card__list player__card__list--last"><li><span>Games</span><br/>' +
          data.games +
          "</li><li><span>Goals</span><br/>" +
          data.goals +
          "</li></ul>"
      );
    },
    displayNone: function ($el) {
      return $el.css("display", "none");
    },
  };

  events = {
    attachAll: function () {
      $switchBtn.on("click", function (e) {
        var $el;
        e.preventDefault();
        $el = $(this);
        if ($el.hasClass("disabled")) {
          return;
        }
        // console.log(scenes);

        scenes.switchSides();
        $switchBtn.removeClass("disabled");
        return $el.addClass("disabled");
      });

      return $players.on("click", function (e) {
        var $el;
        e.preventDefault();
        $el = $(this);
        if ($(".active").length) {
          return false;
        }
        $el.addClass("active");
        scenes.focusPlayer($el);
        return setTimeout(function () {
          return events.attachClose();
        }, 1);
      });
    },
    attachClose: function () {
      return $("body").one("click", function (e) {
        e.preventDefault();
        return scenes.unfocusPlayer();
      });
    },
  };

  scenes = {
    preLoad: function () {
      Velocity(
        $teamListHome,
        {
          opacity: 0,
        },
        0
      );
      Velocity(
        $players,
        {
          opacity: 0,
        },
        0
      );
      Velocity(
        $loadBtn,
        {
          opacity: 0,
        },
        0
      );
      Velocity(
        $switcher,
        {
          opacity: 0,
        },
        0
      );
      Velocity(
        $heading,
        {
          opacity: 0,
        },
        0
      );
      Velocity(
        $subHeading,
        {
          opacity: 0,
        },
        0
      );
      Velocity(
        $(".flag"),
        {
          opacity: 0,
        },
        0
      );

      $playersAway.css("display", "none");

      Velocity(
        $world,
        {
          opacity: 0,
          translateZ: -580,
          translateY: -60,
        },
        0
      );

      return Velocity(
        $("main"),
        {
          opacity: 1,
        },
        0
      );
    },

    loadIn: function (delay = 0) {
      Velocity(
        $(".flag"),
        {
          opacity: 1,
        },
        0
      );

      Velocity(
        $("main"),
        {
          opacity: 1,
        },
        0
      );
      var delayInc;
      Velocity(
        $world,
        {
          opacity: 1,
          translateY: 0,
          translateZ: -580,
        },
        {
          duration: 0,
          delay: delay,
          easing: "spring",
        }
      );
      anim.fadeInDir($heading, 300, delay + 600, 0, 30);
      anim.fadeInDir($subHeading, 300, delay + 800, 0, 30);
      anim.fadeInDir($teamListHome, 300, delay + 800, 0, 30);
      anim.fadeInDir($switcher, 300, delay + 900, 0, 30);
      delay += 1200;
      delayInc = 30;

      return anim.dropPlayers($playersHome, delay, delayInc);
    },

    startLoading: function () {
      var images, key, ref, val;
      anim.fadeInDir($loading, 300, 0, 0, -20);
      images = [];
      ref = data.players.home && data.players.away;
      for (key in ref) {
        val = ref[key];
        images.push(val.asset);
      }
      return dom.preloadImages(images);
    },

    endLoading: function () {
      return anim.fadeOutDir($loading, 300, 1000, 0, -20);
    },

    arrangePlayers: function () {
      return $players.each(function () {
        var $el;
        $el = $(this);
        return Velocity($el, {
          translateX: parseInt($el.attr("data-x")),
          translateZ: parseInt($el.attr("data-y")), // Z is the Y axis on the field
        });
      });
    },

    focusPlayer: function ($el) {
      var shiftY;
      data = $el.data();
      var position = $el.position();
      $(".static").css("z-index", "0");

      $('.js-player[data-side="' + state.curSide() + '"]')
        .not(".active")
        .each(function () {
          var $unfocus;
          $unfocus = $(this);
          $unfocus.css("z-index", "-1");
          return anim.fadeOutDir($unfocus, 300, 0, 0, 0, 0, null, 0.2);
        });

      shiftY = Number($el.parents().data("axis"));

      if (shiftY > 0) {
        shiftY = Number($el.parents().data("axis")) / 2;
      }

      Velocity(
        $world,
        {
          translateX: 0 - (position.left - 500 / 2),
          // translateY: pos.world.baseY,
          translateZ: Number(pos.world.baseZ - shiftY), // Z is the Y axis on the field
        },
        600
      );

      Velocity(
        $(".flag, .static, .brand-logo"),
        {
          opacity: 0,
        },
        100
      );

      return this.showPlayerCard($el, 600, 600);
    },

    unfocusPlayer: function () {
      $(".static").css("z-index", "3");
      var $el;
      $el = $(".js-player.active");
      data = $el.data();
      anim.fadeInDir(
        $('.js-player[data-side="' + state.curSide() + '"]').not(".active"),
        300,
        300,
        0,
        0,
        0,
        null,
        0.2
      );
      $(".js-player").css("z-index", "1");
      $el.removeClass("active");
      Velocity(
        $world,
        {
          translateX: pos.world.baseX,
          translateY: pos.world.baseY,
          translateZ: pos.world.baseZ, // Z is the Y axis on the field
        },
        600
      );

      Velocity(
        $terrain,
        {
          opacity: 1,
        },
        600
      );

      Velocity(
        $(".flag, .static, .brand-logo"),
        {
          opacity: 1,
        },
        {
          delay: 150,
          duration: 600,
        }
      );
      return this.hidePlayerCard($el, 600, 600);
    },

    hidePlayerCard: function ($el, dur, delay) {
      var $card, $image;
      $card = $el.find(".player__card");
      $image = $el.find(".player__img");
      Velocity(
        $image,
        {
          translateY: 0,
        },
        300
      );
      anim.fadeInDir($el.find(".player__label", 200, delay));
      return anim.fadeOutDir($card, 300, 0, 0, -100);
    },

    showPlayerCard: function ($el, dur, delay) {
      var $card, $image;
      $card = $el.find(".player__card");
      $image = $el.find(".player__img");
      Velocity(
        $image,
        {
          translateY: "-=150px",
        },
        300
      );
      anim.fadeOutDir($el.find(".player__label", 200, delay));
      return anim.fadeInDir($card, 300, 200, 0, 100);
    },

    switchSides: function () {
      var $new, $old, delay, delayInc;
      delay = 0;
      delayInc = 20;
      $old = $playersHome;
      $new = $playersAway;

      if (!state.home) {
        $old = $playersAway;
        $new = $playersHome;
      }

      state.swapSides();

      $old.each(function () {
        var $el;
        $el = $(this);

        anim.fadeOutDir($el, 200, delay, 0, -60, 0);
        anim.fadeOutDir($el.find(".player__label"), 200, delay + 700);
        return (delay += delayInc);
      });

      Velocity($(".flag"), {
        opacity: 0,
      });

      Velocity(
        $terrain,
        {
          rotateY: "+=180deg",
        },
        {
          delay: 150,
          duration: 1200,
        }
      );

      Velocity(
        $(".flag"),
        {
          opacity: 1,
        },
        {
          delay: 300,
          duration: 2500,
        }
      );

      // anim.fadeInDir($('.flag'), 800, delay, 0, 50, 0, 'spring');
      return anim.dropPlayers($new, 1500, 30);
    },
  };

  anim = {
    fadeInDir: function (
      $el,
      dur,
      delay,
      deltaX = 0,
      deltaY = 0,
      deltaZ = 0,
      easing = null,
      opacity = 0
    ) {
      $el.css("display", "block");
      Velocity(
        $el,
        {
          translateX: "-=" + deltaX,
          translateY: "-=" + deltaY,
          translateZ: "-=" + deltaZ,
        },
        0
      );
      return Velocity(
        $el,
        {
          opacity: 1,
          translateX: "+=" + deltaX,
          translateY: "+=" + deltaY,
          translateZ: "+=" + deltaZ,
        },
        {
          easing: easing,
          delay: delay,
          duration: dur,
        }
      );
    },
    fadeOutDir: function (
      $el,
      dur,
      delay,
      deltaX = 0,
      deltaY = 0,
      deltaZ = 0,
      easing = null,
      opacity = 0
    ) {
      var display;
      if (!opacity) {
        display = "none";
      } else {
        display = "block";
      }
      Velocity(
        $el,
        {
          opacity: opacity,
          translateX: "+=" + deltaX,
          translateY: "+=" + deltaY,
          translateZ: "+=" + deltaZ,
        },
        {
          easing: easing,
          delay: delay,
          duration: dur,
        }
      );

      return Velocity(
        $el,
        {
          opacity: opacity,
          translateX: "-=" + deltaX,
          translateY: "-=" + deltaY,
          translateZ: "-=" + deltaZ,
        },
        {
          duration: 0,
          display: display,
        }
      );
    },
    dropPlayers: function ($els, delay, delayInc) {
      return $els.each(function () {
        var $el;
        $el = $(this);
        anim.fadeInDir($el, 800, delay, 0, 50, 0, "spring");
        anim.fadeInDir($el.find(".player__label"), 200, delay + 250);
        return (delay += delayInc);
      });
    },
  };

  return (
    <div id="lineups">
      <main >
        <div class="static">
          <div class="js-switcher switcher">
            <a href="#" class="js-switch disabled switch-btn">
              {I18n.t("home")}
            </a>
            <a href="#" class="js-switch switch-btn">
              {I18n.t("away")}
            </a>
          </div>
        </div>
        <div class="js-stage stage texture">
          <div class="js-world world">
            <div class="team js-team">
              <div class="brand-logo-wrapper">
                <img class="brand-logo" src={RESOURCE_URL + 'brand.png'} alt="" />
              </div>
              <div class="flags flags-left">
                <img class="flag flag-top-left" src={RESOURCE_URL + 'flag-left.png'} alt="" />
                <img class="flag flag-bottom-left" src={RESOURCE_URL + 'flag-left.png'} alt="" />
              </div>
              <div class="flags flags-right">
                <img class="flag flag-top-right" src={RESOURCE_URL + 'flag-right.png'} alt="" />
                <img class="flag flag-bottom-right" src={RESOURCE_URL + 'flag-right.png'} alt="" />
              </div>
            </div>

            <div class="terrain js-terrain">
              <div class="field field--alt"></div>
              <div class="field ground">
                <div class="field__texture field__texture--gradient"></div>
                <div class="field__texture field__texture--gradient-b"></div>
                <div class="field__texture field__texture--grass"></div>
                <div class="field__line field__line--goal"></div>
                <div class="field__line field__line--goal field__line--goal--far"></div>
                <div class="field__line field__line--outline"></div>
                <div class="field__line field__line--penalty"></div>
                <div class="field__line field__line--penalty-arc"></div>
                <div class="field__line field__line--penalty-arc field__line--penalty-arc--far"></div>
                <div class="field__line field__line--mid"></div>
                <div class="field__line field__line--circle"></div>
                <div class="field__line field__line--penalty field__line--penalty--far"></div>
              </div>
              <div class="field__side field__side--front"></div>
              <div class="field__side field__side--left"></div>
              <div class="field__side field__side--right"></div>
              <div class="field__side field__side--back"></div>
            </div>
          </div>
          <div class="loading js-loading">
            <div class="loading-spinner"></div>
          </div>
        </div>
      </main>
    </div>
  );
}

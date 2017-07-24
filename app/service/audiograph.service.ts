import { Store,ActionReducer, Action,Reducer } from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import {searchService} from '../service/search.service';
const ss = require('node_modules/socket.io-stream/socket.io-stream.js')

declare var $audiograph: any;
const CATEGORY: string = 'Audiograph';
var audio = new Audio();
audio.controls = true;
export interface IPlaylistTrack {
  track: string;
  artist: string;
  albumImg: string;
  // NOTE not crazy about the `src` property name
  // but using this name prevents having to make other code changes in this library 
  videoURL: string;
  frequencies: any[][];
  playing?: boolean;
  active?: boolean;
}

interface IAUDIOGRAPH_ACTIONS {
  ADD_TRACK: string;
  REMOVE_TRACK: string;
  TOGGLE_MENU: string;
  TOGGLE_PLAY: string;
  NEXT_TRACK: string;
  PREV_TRACK: string;
  TARGET_TRACK: string;
  VOLUME_CONTROL: string;
  RANDOM_TRACK: string;
  CURRENT_CLICK:string
}
export interface IAudiographState {
  playlist?: Array<any>;
  menuOpen?: boolean;
  playing?: boolean;
  random?:boolean;
}
var selectedTracks: Array<any> = shuffle([
  {
    trackName: '',
    artist: '',
    albumImg:'',
    videoURL: '',
      frequencies: [[60, 4000], [20, 5000]],
    playing: false,
    active: false
  }
]);

// first one from randomized playlist starts playing
selectedTracks[0].playing = true;
selectedTracks[0].active = true;

const initialState: IAudiographState = {
  playlist: selectedTracks,
  menuOpen: false,
  playing: true,
  random:false
}  ;
window.addEventListener('keydown', function (ev) {
      if (ev.keyCode === 39 ) {
        $audiograph.playNext();
      } 
    });

window.addEventListener('keydown', function (ev) {
      if (ev.keyCode === 37 ) {
        $audiograph.playPrevious();
      } 
});

export const AUDIOGRAPH_ACTIONS: IAUDIOGRAPH_ACTIONS = {
  ADD_TRACK: `[${CATEGORY}] ADD_TRACK`,
  REMOVE_TRACK: `[${CATEGORY}] REMOVE_TRACK`,
  TOGGLE_MENU: `[${CATEGORY}] TOGGLE_MENU`,
  TOGGLE_PLAY: `[${CATEGORY}] TOGGLE_PLAY`,
  NEXT_TRACK: `[${CATEGORY}] NEXT_TRACK`,
  PREV_TRACK: `[${CATEGORY}] PREV_TRACK`,
  TARGET_TRACK: `[${CATEGORY}] TARGET_TRACK`,
  VOLUME_CONTROL: `[${CATEGORY}] VOLUME_CONTROL`,
  RANDOM_TRACK:`[${CATEGORY}] RANDOM_TRACK`,
  CURRENT_CLICK:`[${CATEGORY}] CURRENT_CLICK`
};

export const audiograph: ActionReducer<IAudiographState> = (state: IAudiographState = initialState, action: Action) => {
  var changeState = () => {
    return Object.assign({}, state, action.payload);
  };
  // resets playing states of all tracks in playlist and returns index of what the currently active track was
  var resetPlaying = () => {
    let currentTrackIndex = 0;
    for (let i = 0; i < state.playlist.length; i++) {
      if (state.playlist[i].active) {
        currentTrackIndex = i;
      }
      state.playlist[i].playing = false;
    }
    return currentTrackIndex;
  };
  var changeTrack = (direction: number, index?:number, random?:boolean) => {
    var currentTrackIndex = resetPlaying();
    state.playlist[currentTrackIndex].active = false;
    if (typeof index !== 'undefined') {
      currentTrackIndex = index;
    }
     else {
          if (direction > 0) {
            currentTrackIndex++;
          } else {
            currentTrackIndex--;
          }
    }
    if (currentTrackIndex === state.playlist.length) {
      // back to beginning
      currentTrackIndex = 0;
    } else if (currentTrackIndex < 0) {
      // go to the end (looping back in reverse)
      currentTrackIndex = state.playlist.length - 1;
    }
    //random 0724
    if(random == true)
    {
      for(var k = 0; k < direction; k++)
      {
        currentTrackIndex++;
      }
    }
    state.playlist[currentTrackIndex].active = true;
    state.playlist[currentTrackIndex].playing = true;

    //socket stream
    var socket = io.connect('http://localhost:4100/stream')
    var stream = ss.createStream()
    ss(socket).emit('PlayTrack',stream,{track:state.playlist[currentTrackIndex].videoURL})
    
    ss(socket).on('result',function(data){
         var type = data.type
         var payload = data.payload
         var ms = new MediaSource()
         var url = URL.createObjectURL(ms)

         getAlbumart(state.playlist[currentTrackIndex].AlbumImg)

         audio.load()
         audio.src = url
            
         ms.addEventListener('sourceopen',callback,false)
         ms.addEventListener('sourceended',function(e){
          console.log('mediaSource readystate: ' + this.readystate)
         },false)
         
         function callback(){
           var sourceBuffer = ms.addSourceBuffer('audio/mpeg')
          // sourceBuffer.appendWindowEnd = 4.0;
            sourceBuffer.addEventListener('abort', function (e) {
                console.log('abort: ' + ms.readyState)
                ms.endOfStream();
                socket.close()
            });

            payload.stream.on('data', function (data) {
                sourceBuffer.appendBuffer(data);
            });
              // 데이터 전송이 완료되었을 경우 발생한다.
            payload.stream.on('end', function () {
                console.log('endOfStream call');
                ms.endOfStream();
                socket.close()
            });
         }
    });
    console.log(`Track change: ${state.playlist[currentTrackIndex].trackName}`);
    action.payload = { playlist: [...state.playlist], playing: true };
  };
  switch (action.type) {
    case AUDIOGRAPH_ACTIONS.ADD_TRACK:
      action.payload = { playlist: [...state.playlist, action.payload] };
      return changeState();
    case AUDIOGRAPH_ACTIONS.REMOVE_TRACK:
      action.payload = {
        playlist: state.playlist.filter((item: IPlaylistTrack) => {
          return item.videoURL != action.payload.videoURL; //이거도 교체함 src -> videoURL
        })
      };
      return changeState();
    case AUDIOGRAPH_ACTIONS.TOGGLE_MENU:
      if (typeof action.payload === 'undefined') {
        action.payload = { menuOpen: !state.menuOpen };
      }
      return changeState();
    case AUDIOGRAPH_ACTIONS.TOGGLE_PLAY:
      if (typeof action.payload === 'undefined') {
        action.payload = { playing: !state.playing };
      }
      if (action.payload.playing) {
        $audiograph.play();
        if(audio.paused == true) audio.play();
        else audio.load()  
      } else {
        $audiograph.pause();
        audio.pause()
      }
      return changeState();
    case AUDIOGRAPH_ACTIONS.RANDOM_TRACK:
      if(state.random == true)
        state.random = false
      else
        state.random =true
      return changeState();
    case AUDIOGRAPH_ACTIONS.NEXT_TRACK:
      if(state.random == true)
      {
        var random =  generateRandom(0,state.playlist.length)
        changeTrack(random,0,true)
      }
      else
      {
        changeTrack(1);
      }
      return changeState();
    case AUDIOGRAPH_ACTIONS.PREV_TRACK:
      changeTrack(-1);
      return changeState();
    case AUDIOGRAPH_ACTIONS.TARGET_TRACK:
      $audiograph.playIndex(action.payload);
      changeTrack(0, action.payload);
      return changeState();
    case AUDIOGRAPH_ACTIONS.VOLUME_CONTROL:
    var maxVolume = 1
    if(action.payload.bool == 'minus')
    {
      let volume = audio.volume + action.payload.volume
      if (audio.volume <= 0) 
      {
        document.getElementById('volumetext').innerHTML = String(audio.volume)
      }
      else
      {
         audio.volume = volume;
        document.getElementById('volumetext').innerHTML = String(audio.volume)
      }
     
    }
    else
    {
        let volume = audio.volume + action.payload.volume
         if (volume <= maxVolume) audio.volume = volume
        document.getElementById('volumetext').innerHTML = String(audio.volume)
    }
    return state;
  case AUDIOGRAPH_ACTIONS.CURRENT_CLICK:
        var currentTime = action.payload.currentLeft/action.payload.currentOff*audio.duration
        audio.currentTime = currentTime
        return state;
    default:
      return state;
  }
};

@Injectable()
export class AudiographService {
  playlist: IPlaylistTrack[] = [];
  public state$: Observable<any>;
  private _init: boolean = false;

  constructor(private _searchService:searchService,private _http:Http,private store: Store<any>) {
    this.state$ = store.select('audiograph');
    //audiographReducer -> changestate() -> .subscribe()
    // state <- IAudiographState

      audio.onended = function()
      {
        $audiograph.playNext();
      }
      audio.ontimeupdate = function()
      {
        var duration = audio.duration
        var currentTime = audio.currentTime
        var dsec: any;
        var dmin : any;
        var csec: any;
        var cmin : any;
        dsec = Math.floor( duration );    
        dmin = Math.floor( dsec / 60 );
        dmin = dmin >= 10 ? dmin : '0' + dmin;    
        dsec = Math.floor( dsec % 60 );
        dsec = dsec >= 10 ? dsec : '0' + dsec;

        csec = Math.floor( currentTime );    
        cmin = Math.floor( csec / 60 );
        cmin = cmin >= 10 ? cmin : '0' + cmin;    
        csec = Math.floor( csec % 60 );
        csec = csec >= 10 ? csec : '0' + csec;
        var remain = currentTime/duration*100
        if(dsec =="0NaN" && dmin == Infinity)
        {
          dsec = "loading"
          dmin = ""
        }
        document.querySelector('body > my-app > div > div > tunesplaylist > div.player-c > div.player-timeline > div.bar.bar--elapsed').setAttribute('style','width :'+remain+'%')
        document.querySelector('body > my-app > div > div > tunesplaylist > div.player-c > div.player-timeline > div.bar.bar--buffered.bar--animated').setAttribute('style','width :100%')
        document.getElementById('tracktime').innerHTML = cmin+':'+csec + ' / ' + dmin+':'+dsec;
      }
      audio.oncanplaythrough = function(){ 
      audio.play();
      };

    this.state$.subscribe((state: IAudiographState) => {
      if (typeof state.playing !== 'undefined') {
        console.log(`Toggling playback: ${state.playing}`);
      }   
      this.playlist.length = 0;
      for (let item of state.playlist) {
        this.playlist.push(item);
      }
      if (!this._init) {
        this._init = true;
        this.init();
      }

    });
  }

  init() {
    $audiograph.init(this.playlist);
    
    $audiograph.addListener('playNext', () => {
      this.store.dispatch({ type: AUDIOGRAPH_ACTIONS.NEXT_TRACK });
      // console.log('Audiograph: playNext() function called!');
    });

    $audiograph.addListener('playPrevious', () => {
      this.store.dispatch({ type: AUDIOGRAPH_ACTIONS.PREV_TRACK });
      // console.log('Audiograph: playPrevious() function called!');
    });

    $audiograph.addListener('playIndex', (index) => {
      // console.log('Audiograph: playIndex() function called with index "' + index + '"!');
    });

    $audiograph.addListener('pause', () => {
      // console.log('Audiograph: pause() function called!');
    });

    $audiograph.addListener('play', () => {
      // console.log('Audiograph: play() function called!');
    });

    // $audiograph.addListener('random', () => {
    //   this.store.dispatch({ type: AUDIOGRAPH_ACTIONS.RANDOM_TRACK });
    // });

    $audiograph.addListener('newPalette', (palette) => {
      console.log('Audiograph: the palette has been changed to - Background color = ' + 
        palette.backgroundColor + ', Foreground colors = ' + palette.foregroundColors);
    });
  }
 
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function getAlbumart(url){
     var getImage = document.querySelector('.intro-2')
        //  getImage.innerHTML = '<img src="'+url+'" style="width: 480px;height: 360px;border-bottom-left-radius: 30px 30px;border-bottom-right-radius: 30px 30px;border-top-left-radius: 50px 50px;border-top-right-radius: 50px 50px;opacity: 0.9;">'
         getImage.innerHTML = '<img src="'+url+'" style="width: 60%;height: 60%;border-bottom-left-radius: 30px 30px;border-bottom-right-radius: 30px 30px;border-top-left-radius: 50px 50px;border-top-right-radius: 50px 50px;opacity: 0.9;">'
}

function generateRandom(min,max){
  var ranNum = Math.floor(Math.random()*(max-min+1)) + min;
  return ranNum;
}

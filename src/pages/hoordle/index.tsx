import React, { useEffect, useState, FC } from "react";
import Tile from "./tile";
import Key from "./key";
import "./hoordle.scss";
import targetWords from "../../assets/targetwords";
import dictionary from "../../assets/dictionary";
import { TileState } from "./tileState";
import Modal from "../../components/welcome/modal";
import help from "../../assets/icons/help.svg";
import exit from "../../assets/icons/close.svg";
import caret from "../../assets/icons/caret-white.svg";
import BackSpace from "../../assets/icons/backspace.svg";
import BulletPoint from "../../components/bullet";
import { useNavigate } from "react-router-dom";
import Discord from "../../assets/icons/discord.svg";
import timeron from "../../assets/icons/timeron.svg";
import alarm from "../../assets/icons/alarm.svg";
import axios from "axios";
import "../../components/welcome/welcome.scss";
import { DateTime } from "luxon";
interface Timer {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}
interface Countdown {
  h: number;
  m: number;
  s: number;
}
interface HoordlePageProps {
  disc: string;
  pointsTo?: number;
}
const HoordlePage: FC<HoordlePageProps> = ({ disc, pointsTo }) => {
  const [letterCount, setLetterCount] = useState(0);
  const [showInfo, setShowInfo] = useState(true);
  const [wrong, setWrong] = useState(false);
  const [showWin, setShowWin] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [guess, setGuess] = useState<string[]>([]);
  const [page, setPage] = useState<number>(0);
  const [showLoss, setShowLoss] = useState<boolean>(false);
  const [paused, setPaused] = useState(false);
  const [checkingDate, setCheckingDate] = useState(true);
  const [word, setWord] = useState(0);
  const navigate = useNavigate();

  const [playerTime, setPlayerTime] = useState<number>(0);
  const [countdown, setCountdown] = useState<number>(0);
  let timer = 1000;

  const calculateTimeLeft = () => {
    let realTime = DateTime.utc();
    const difference = +new Date(2022, 0, 0, 0, 0, 0) - +new Date();
    let timeLeft: Timer = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    // console.log(timeLeft, "left?");
    return timeLeft;
  };
  const [timeLeft, setTimeLeft] = useState<Timer>(calculateTimeLeft());

  useEffect(() => {
    if (!paused) {
      setTimeout(() => {
        setPlayerTime(playerTime + 1);
        countdown > 0 && setCountdown(countdown - 1);
        setTimeLeft(calculateTimeLeft());
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [timeLeft]);

  useEffect(() => {
    if (countdown === 0) {
      wordSetter();
    }
  }, [countdown]);
  const wordSetter = async () => {
    let startDay = new Date("March 1, 2022, 0:00:00 UTC");
    let fetchedDate = await axios({
      method: "GET",
      url: "https://worldtimeapi.org/api/timezone/Etc/UTC",
      headers: {},
    });
    // console.log(startDay, "START");

    let realTime;
    if (fetchedDate.status === 200) {
      realTime = DateTime.fromISO(fetchedDate.data.utc_datetime, {
        zone: "utc",
      });
      // console.log(fetchedDate);
      // console.log(startDay, "REAL");
      let startDayMonth = startDay.getUTCMonth();
      let startDayDays = startDay.getUTCDate();
      let startDayHours = startDay.getUTCHours();
      let startDayMins = startDay.getUTCMinutes();
      let startDaySecs = startDay.getUTCSeconds();
      let nowMonth = realTime.month;
      let nowDay = realTime.day;
      let nowHours = realTime.hour;
      let nowMins = realTime.minute;
      let nowSecs = realTime.second;

      let secondDiff =
        (nowHours % 2 > 0 ? 7200 : 3600) - (nowMins * 60 + nowSecs);
      // console.log(secondDiff);
      secondDiff = secondDiff;
      // console.log(startDaySecs, startDayMins, startDayHours);
      // console.log(nowSecs, nowDay, nowHours);
      let difference =
        nowMonth +
        nowDay * 24 +
        nowHours -
        (startDayMonth + startDayDays * 24 + startDayHours);
      difference = difference / 2;
      // console.log(nowHours);
      // console.log(secondDiff);

      setCountdown(secondDiff);
      setWord(Math.floor(difference));
      setCheckingDate(false);
    } else {
      setWrong(true);
    }
  };

  // useEffect(() => {
  //   wordSetter();
  // }, [timeLeft]);
  const [keyStates, setKeyStates] = useState<{
    q: string;
    w: string;
    e: string;
    r: string;
    t: string;
    y: string;
    u: string;
    i: string;
    o: string;
    p: string;
    a: string;
    s: string;
    d: string;
    f: string;
    g: string;
    h: string;
    j: string;
    k: string;
    l: string;
    z: string;
    x: string;
    c: string;
    v: string;
    b: string;
    n: string;
    m: string;
  }>({
    q: "blank",
    w: "blank",
    e: "blank",
    r: "blank",
    t: "blank",
    y: "blank",
    u: "blank",
    i: "blank",
    o: "blank",
    p: "blank",
    a: "blank",
    s: "blank",
    d: "blank",
    f: "blank",
    g: "blank",
    h: "blank",
    j: "blank",
    k: "blank",
    l: "blank",
    z: "blank",
    x: "blank",
    c: "blank",
    v: "blank",
    b: "blank",
    n: "blank",
    m: "blank",
  });
  const [tileStates, setTileStates] = useState<
    { value: string; state: string }[]
  >([
    {
      value: "",
      state: "blank",
    },
    {
      value: "",
      state: "blank",
    },
    {
      value: "",
      state: "blank",
    },
    {
      value: "",
      state: "blank",
    },
    {
      value: "",
      state: "blank",
    },
    {
      value: "",
      state: "blank",
    },
    {
      value: "",
      state: "blank",
    },
    {
      value: "",
      state: "blank",
    },
    {
      value: "",
      state: "blank",
    },
    {
      value: "",
      state: "blank",
    },
    {
      value: "",
      state: "blank",
    },
    {
      value: "",
      state: "blank",
    },
    {
      value: "",
      state: "blank",
    },
    {
      value: "",
      state: "blank",
    },
    {
      value: "",
      state: "blank",
    },
    {
      value: "",
      state: "blank",
    },
    {
      value: "",
      state: "blank",
    },
    {
      value: "",
      state: "blank",
    },
    {
      value: "",
      state: "blank",
    },
    {
      value: "",
      state: "blank",
    },
    {
      value: "",
      state: "blank",
    },
    {
      value: "",
      state: "blank",
    },
    {
      value: "",
      state: "blank",
    },
    {
      value: "",
      state: "blank",
    },
    {
      value: "",
      state: "blank",
    },
    {
      value: "",
      state: "blank",
    },
    {
      value: "",
      state: "blank",
    },
    {
      value: "",
      state: "blank",
    },
    {
      value: "",
      state: "blank",
    },
    {
      value: "",
      state: "blank",
    },
  ]);

  const timerComponents: JSX.Element[] = [];

  timerComponents.push(
    <div style={{ fontSize: "0.8em" }} className="countdown-number-container">
      <span style={{ color: "white" }}>
        {`0${countdown > 3600 ? "1" : "0"}`}:
      </span>
    </div>
  );
  timerComponents.push(
    <div style={{ fontSize: "0.8em" }} className="countdown-number-container">
      <span style={{ color: "white" }}>
        {`${DateTime.fromSeconds(countdown).minute < 10 ? "0" : ""}${
          DateTime.fromSeconds(countdown).minute
        }`}
        :
      </span>
    </div>
  );
  timerComponents.push(
    <div style={{ fontSize: "0.8em" }} className="countdown-number-container">
      <span style={{ color: "white" }}>{`${
        DateTime.fromSeconds(countdown).second < 10 ? "0" : ""
      }${DateTime.fromSeconds(countdown).second}`}</span>{" "}
    </div>
  );
  const renderPlayerTime = (time: number) => {
    let formattedTime = DateTime.fromSeconds(time);
    // console.log(formattedTime, "format");
    const timerComponents: JSX.Element[] = [];

    timerComponents.push(
      <div style={{ fontSize: "0.8em" }} className="countdown-number-container">
        <span style={{ color: "white" }}>{`0${time > 3599 ? "1" : "0"}`}:</span>
      </div>
    );
    timerComponents.push(
      <div style={{ fontSize: "0.8em" }} className="countdown-number-container">
        <span style={{ color: "white" }}>
          {`${formattedTime.minute < 10 ? "0" : ""}${formattedTime.minute}`}:
        </span>
      </div>
    );
    timerComponents.push(
      <div style={{ fontSize: "0.8em" }} className="countdown-number-container">
        <span style={{ color: "white" }}>{`${
          formattedTime.second < 10 ? "0" : ""
        }${formattedTime.second}`}</span>{" "}
      </div>
    );

    return timerComponents;
  };

  const keyType = (value: string, state: string) => {
    let newKeyStates = { ...keyStates };
    let newGuess = guess;
    let str = value as keyof typeof newKeyStates;
    if (guess.length === 5 || checkingDate) {
      shakeRow();
      setWrong(true);
      return;
    } else {
      newGuess.push(value);
      setLetterCount(letterCount + 1);
      handleNextTile(value, state);
    }
    // if (keyStates[str] === "blank") {
    //   newKeyStates[str] = "correct";
    //   setKeyStates(newKeyStates);
    // } else {f
    //   handleNextTile(value, state);
    // }
  };
  const backspace = () => {
    if (guess.length > 0) {
      let newGuess = guess;
      newGuess.pop();
      setGuess(newGuess);
      let newTilesStates = [...tileStates];
      newTilesStates[letterCount - 1].state = "blank";
      newTilesStates[letterCount - 1].value = "";
      setTileStates(newTilesStates);
      setLetterCount(letterCount - 1);
    } else {
      shakeRow();
    }
  };
  const handleNextTile = (value: string, state: string) => {
    let newTileStates = [...tileStates];
    let str = value as keyof typeof newTileStates;
    let nextTileIndex = newTileStates.findIndex((tile) => tile.value === "");
    // TODO implement proper case logic
    if (tileStates[nextTileIndex]) {
      newTileStates[nextTileIndex].value = value;
      newTileStates[nextTileIndex].state = "entered";
      setTileStates(newTileStates);
    }
  };
  const submitGuess = async () => {
    let condensedGuess = guess.join("");
    if (guess.length < 5) {
      shakeRow();
    } else if (condensedGuess === targetWords[word]) {
      flipTiles();
      setGuess([]);
      setPaused(true);
      setShowWin(true);
    } else if (!dictionary.includes(condensedGuess) || checkingDate) {
      setWrong(true);
      setGuess(["", "", "", "", ""]);
      let newTilesStates = tileStates;
      guess.forEach((letter, index) => {
        newTilesStates[letterCount - 5 + index].value = "";
        newTilesStates[letterCount - 5 + index].state = "blank";
      });
      setLetterCount(letterCount - 5);
      setGuess([]);
      shakeRow();
    } else {
      flipTiles();
      setGuess([]);
      if (letterCount === 30) {
        setPaused(true);
        setShowLoss(true);
      }
    }
  };
  const flipTiles = () => {
    let targetWord = targetWords[word];
    let newTilesStates = [...tileStates];
    let newKeyStates = { ...keyStates };

    guess.forEach((letter, index) => {
      let str = letter as keyof typeof newKeyStates;

      if (letter === targetWord[index]) {
        newTilesStates[index - 5 + letterCount].state = "correct";
        newKeyStates[str] = "correct";
        setTileStates(newTilesStates);
      } else if (targetWord.includes(letter)) {
        newTilesStates[index - 5 + letterCount].state = "incorrect-position";
        newKeyStates[str] = "incorrect-position";
        setTileStates(newTilesStates);
      } else {
        newTilesStates[index - 5 + letterCount].state = "incorrect";
        newKeyStates[str] = "incorrect";
        setTileStates(newTilesStates);
      }
    });
    setKeyStates(newKeyStates);
  };
  const shakeRow = () => {};

  // useEffect(() => {}, [
  //   handleNextTile,
  //   setTileStates,
  //   tileStates,
  //   letterCount,
  //   guess,
  //   setGuess,
  //   flipTiles,
  //   // timer,
  // ]);
  const lossContent = [
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        fontFamily: '"Secular One", sans-serif',
        alignItems: "center",
      }}
    >
      <b
        style={{
          fontSize: "1.2em",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        Bruh.
      </b>
      <span style={{ marginTop: "0.5em" }}>Take this L.</span>
      <button className="dismiss" onClick={() => setShowLoss(false)}>
        <BulletPoint margin={"-2px 10px 0px 0px"} />
        I'm sorry, fam.
      </button>
    </div>,
  ];
  const wrongContent = [
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        fontFamily: '"Secular One", sans-serif',
        alignItems: "center",
      }}
    >
      <b
        style={{
          fontSize: "1.2em",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        C'mon, fool. That ain't from the hood.
      </b>
      <span style={{ marginTop: "0.5em" }}>
        Speak the mothafuckin language.
      </span>
      <button className="dismiss" onClick={() => setWrong(false)}>
        <BulletPoint margin={"-2px 10px 0px 0px"} /> Say less, fam.
      </button>
    </div>,
  ];
  const winContent = [
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        fontFamily: '"Secular One", sans-serif',
        alignItems: "center",
      }}
    >
      <b
        style={{
          fontSize: "1.2em",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        GANG SHIT
      </b>
      {targetWords[word] ? (
        <div
          className="hoordle-guess-container"
          style={{ justifyContent: "flex-start", margin: "0.5em 0em" }}
        >
          <Tile value={targetWords[word][0]} state="correct" />
          <Tile value={targetWords[word][1]} state="correct" />
          <Tile value={targetWords[word][2]} state="correct" />
          <Tile value={targetWords[word][3]} state="correct" />
          <Tile value={targetWords[word][4]} state="correct" />
        </div>
      ) : null}
      <span style={{ display: "flex", fontSize: "1.2em" }}>
        {" "}
        {renderPlayerTime(playerTime)}
      </span>
      <button className="dismiss" onClick={() => setShowWin(false)}>
        <BulletPoint margin={"-2px 10px 0px 0px"} /> We lit, fam.
      </button>
      {/* <span>{timerComponents}</span> */}
    </div>,
  ];
  const modalContent = [
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        fontFamily: '"Secular One", sans-serif',
      }}
    >
      <b
        style={{
          fontSize: "1.2em",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <img
          src={exit}
          className="exit-button"
          style={{ visibility: "hidden" }}
          onClick={(e) => {
            e.stopPropagation();
            setShowInfo(false);
          }}
        />{" "}
        HOW TO PLAY
        <img
          src={exit}
          className="exit-button"
          onClick={(e) => {
            e.stopPropagation();
            setShowInfo(false);
          }}
        />
      </b>
      <span
        style={{ display: "flex", alignItems: "flex-start", margin: "0.5em" }}
      >
        <BulletPoint margin={"-2px 5px 0px 0px"} />
        Like a Magnum .44 holds 6 rounds, you only get 6 tries at guessing the
        HOORDLE.
      </span>
      <span
        style={{ display: "flex", alignItems: "flex-start", margin: "0.5em" }}
      >
        <BulletPoint margin={"-2px 5px 0px 0px"} /> These words are Hood-related
        however you may guess with any valid word from the English language.
      </span>
      <span
        style={{ display: "flex", alignItems: "flex-start", margin: "0.5em" }}
      >
        <BulletPoint margin={"-2px 5px 0px 0px"} /> Each guess must be a valid 5
        letter word. Hit the ENTER key to submit your guess.
      </span>
      <span
        style={{ display: "flex", alignItems: "flex-start", margin: "0.5em" }}
      >
        <BulletPoint margin={"-2px 5px 0px 0px"} /> After each guess, the color
        of the tiles will change to show how close your guess was to the word.
      </span>
      <span
        style={{ display: "flex", alignItems: "flex-start", margin: "0.5em" }}
      >
        <BulletPoint margin={"-2px 5px 0px 0px"} /> Hit the clock icon on the
        top right to toggle between your current time taken to solve the Hoordle
        and a countdown until the next word dropping!
      </span>
      <div
        style={{
          display: "flex",
          flexGrow: 1,
          margin: "0.5em 0em",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <a
          id="big-disc-btn"
          style={{
            textDecoration: "none",
            fontSize: "1.5em",
            display: "flex",
            alignItems: "center",
          }}
          href={disc}
        >
          <button onClick={(e) => e.stopPropagation()} className="discord-btn">
            <img style={{ height: "30px", width: "30px" }} src={Discord} />{" "}
            &nbsp; Join our Discord{" "}
          </button>
        </a>
        <button
          className="dismiss"
          onClick={(e) => {
            e.stopPropagation();
            setShowInfo(false);
          }}
        >
          <BulletPoint margin={"-2px 10px 0px 0px"} /> PLAY THE GAME
        </button>
      </div>
      <div className="modal-dot-container">
        <img
          className="modal-caret"
          onClick={(e) => {
            e.stopPropagation();
            page === 1 ? setPage(0) : setPage(1);
          }}
          src={caret}
        />
        <div className="modal-dot filled"></div>
        <div className="modal-dot"></div>
        <img
          className="modal-caret"
          onClick={(e) => {
            e.stopPropagation();
            page === 1 ? setPage(0) : setPage(1);
          }}
          src={caret}
        />
      </div>
    </div>,
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        fontFamily: '"Secular One", sans-serif',
      }}
    >
      <b
        style={{
          fontSize: "1.2em",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <img
          src={exit}
          className="exit-button"
          style={{ visibility: "hidden" }}
          onClick={(e) => {
            e.stopPropagation();
            setShowInfo(false);
          }}
        />{" "}
        EXAMPLES
        <img
          src={exit}
          className="exit-button"
          onClick={(e) => {
            e.stopPropagation();
            setShowInfo(false);
          }}
        />{" "}
      </b>{" "}
      <div
        className="hoordle-guess-container"
        style={{ justifyContent: "flex-start", margin: "0.5em 0em" }}
      >
        <Tile value="g" state="entered" />
        <Tile value="l" state="entered" />
        <Tile value="o" state="correct" />
        <Tile value="c" state="entered" />
        <Tile value="k" state="entered" />
      </div>
      <span>The letter O is IN the word and IN the correct spot.</span>
      <div
        className="hoordle-guess-container"
        style={{ justifyContent: "flex-start", margin: "0.5em 0em" }}
      >
        <Tile value="p" state="entered" />
        <Tile value="i" state="incorrect-position" />
        <Tile value="e" state="entered" />
        <Tile value="c" state="entered" />
        <Tile value="e" state="entered" />
      </div>
      <span>The letter I is IN the word and NOT IN the correct spot.</span>
      <div
        className="hoordle-guess-container"
        style={{ justifyContent: "flex-start", margin: "0.5em 0em" }}
      >
        <Tile value="d" state="entered" />
        <Tile value="u" state="entered" />
        <Tile value="r" state="entered" />
        <Tile value="a" state="entered" />
        <Tile value="g" state="incorrect" />
      </div>
      <span style={{ margin: "0.5em 0em" }}>
        The letter G is NOT IN the word.
      </span>
      <span
        style={{
          margin: "0.5em 0em",
          display: "flex",
        }}
      ></span>
      <span style={{ margin: "0.5em 0em" }}>
        Join our Discord to participate in daily WL Hoordle contests!
      </span>
      <span style={{ margin: "0.5em 0em" }}>
        A new HOORDLE is generated every 2 hours (even-numbered hours EST).
      </span>
      <em style={{ margin: "0.5em 0em" }}>
        HOOD-DOODLE-WORDLE? Yes, we know how ridiculous it sounds.
      </em>
      <div
        style={{
          display: "flex",
          flexGrow: 1,
          margin: "0.5em 0em",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <a
          id="big-disc-btn"
          style={{ textDecoration: "none", fontSize: "1.5em" }}
          href={disc}
        >
          <button onClick={(e) => e.stopPropagation()} className="discord-btn">
            <img style={{ height: "30px", width: "30px" }} src={Discord} />{" "}
            &nbsp; Join our Discord{" "}
          </button>
        </a>
        <button
          className="dismiss"
          onClick={(e) => {
            e.stopPropagation();
            setShowInfo(false);
          }}
        >
          <BulletPoint margin={"-2px 10px 0px 0px"} /> PLAY THE GAME
        </button>
      </div>
      <div className="modal-dot-container">
        <img
          className="modal-caret"
          onClick={(e) => {
            e.stopPropagation();
            page === 1 ? setPage(0) : setPage(1);
          }}
          src={caret}
        />
        <div className="modal-dot"></div>
        <div className="modal-dot filled"></div>
        <img
          className="modal-caret"
          onClick={(e) => {
            e.stopPropagation();
            page === 1 ? setPage(0) : setPage(1);
          }}
          src={caret}
        />
      </div>
    </div>,
  ];

  return (
    <section className="hoordle-container">
      <div className="hoordle-title">
        <>
          <img
            src={caret}
            className="hoordle-info"
            style={{
              transform: "rotate(90deg)",
              cursor: "pointer",
              margin: "0em 0.5em",
            }}
            onClick={() => navigate(`/${pointsTo ? pointsTo : ""}`)}
          />
          <img
            className="hoordle-info"
            style={{ margin: "0em 0.5em" }}
            onClick={() => setShowInfo(true)}
            src={help}
          />
        </>
        <span>HOORDLE</span>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {showTime ? renderPlayerTime(playerTime) : timerComponents}
          {/* {renderPlayerTime(playerTime)} */}
          <img
            className="hoordle-info"
            style={{ margin: "0em 0.5em" }}
            onClick={() => setShowTime(!showTime)}
            src={showTime ? timeron : alarm}
            // src={timeron}
          />
        </div>
      </div>

      <div className="hoordle-guess-container">
        <Tile value={tileStates[0].value} state={tileStates[0].state} />
        <Tile value={tileStates[1].value} state={tileStates[1].state} />
        <Tile value={tileStates[2].value} state={tileStates[2].state} />
        <Tile value={tileStates[3].value} state={tileStates[3].state} />
        <Tile value={tileStates[4].value} state={tileStates[4].state} />
        <Tile value={tileStates[5].value} state={tileStates[5].state} />
        <Tile value={tileStates[6].value} state={tileStates[6].state} />
        <Tile value={tileStates[7].value} state={tileStates[7].state} />
        <Tile value={tileStates[8].value} state={tileStates[8].state} />
        <Tile value={tileStates[9].value} state={tileStates[9].state} />
        <Tile value={tileStates[10].value} state={tileStates[10].state} />
        <Tile value={tileStates[11].value} state={tileStates[11].state} />
        <Tile value={tileStates[12].value} state={tileStates[12].state} />
        <Tile value={tileStates[13].value} state={tileStates[13].state} />
        <Tile value={tileStates[14].value} state={tileStates[14].state} />
        <Tile value={tileStates[15].value} state={tileStates[15].state} />
        <Tile value={tileStates[16].value} state={tileStates[16].state} />
        <Tile value={tileStates[17].value} state={tileStates[17].state} />
        <Tile value={tileStates[18].value} state={tileStates[18].state} />
        <Tile value={tileStates[19].value} state={tileStates[19].state} />
        <Tile value={tileStates[20].value} state={tileStates[20].state} />
        <Tile value={tileStates[21].value} state={tileStates[21].state} />
        <Tile value={tileStates[22].value} state={tileStates[22].state} />
        <Tile value={tileStates[23].value} state={tileStates[23].state} />
        <Tile value={tileStates[24].value} state={tileStates[24].state} />
        <Tile value={tileStates[25].value} state={tileStates[25].state} />
        <Tile value={tileStates[26].value} state={tileStates[26].state} />
        <Tile value={tileStates[27].value} state={tileStates[27].state} />
        <Tile value={tileStates[28].value} state={tileStates[28].state} />
        <Tile value={tileStates[29].value} state={tileStates[29].state} />
      </div>

      <div className="hoordle-keyboard">
        <div className="row">
          <Key
            value={"q"}
            state={keyStates["q"]}
            onClick={() => keyType("q", keyStates["q"])}
          />
          <Key
            value={"w"}
            state={keyStates["w"]}
            onClick={() => keyType("w", keyStates["w"])}
          />
          <Key
            value={"e"}
            state={keyStates["e"]}
            onClick={() => keyType("e", keyStates["e"])}
          />
          <Key
            value={"r"}
            state={keyStates["r"]}
            onClick={() => keyType("r", keyStates["r"])}
          />
          <Key
            value={"t"}
            state={keyStates["t"]}
            onClick={() => keyType("t", keyStates["t"])}
          />
          <Key
            value={"y"}
            state={keyStates["y"]}
            onClick={() => keyType("y", keyStates["y"])}
          />
          <Key
            value={"u"}
            state={keyStates["u"]}
            onClick={() => keyType("u", keyStates["u"])}
          />
          <Key
            value={"i"}
            state={keyStates["i"]}
            onClick={() => keyType("i", keyStates["i"])}
          />
          <Key
            value={"o"}
            state={keyStates["o"]}
            onClick={() => keyType("o", keyStates["o"])}
          />
          <Key
            value={"p"}
            state={keyStates["p"]}
            onClick={() => keyType("p", keyStates["p"])}
          />
        </div>
        <div className="row">
          <Key
            value={"a"}
            state={keyStates["a"]}
            onClick={() => keyType("a", keyStates["a"])}
          />
          <Key
            value={"s"}
            state={keyStates["s"]}
            onClick={() => keyType("s", keyStates["s"])}
          />
          <Key
            value={"d"}
            state={keyStates["d"]}
            onClick={() => keyType("d", keyStates["d"])}
          />
          <Key
            value={"f"}
            state={keyStates["f"]}
            onClick={() => keyType("f", keyStates["f"])}
          />
          <Key
            value={"g"}
            state={keyStates["g"]}
            onClick={() => keyType("g", keyStates["g"])}
          />
          <Key
            value={"h"}
            state={keyStates["h"]}
            onClick={() => keyType("h", keyStates["h"])}
          />
          <Key
            value={"j"}
            state={keyStates["j"]}
            onClick={() => keyType("j", keyStates["j"])}
          />
          <Key
            value={"k"}
            state={keyStates["k"]}
            onClick={() => keyType("k", keyStates["k"])}
          />
          <Key
            value={"l"}
            state={keyStates["l"]}
            onClick={() => keyType("l", keyStates["l"])}
          />
        </div>
        <div className="row">
          <button onClick={() => submitGuess()} className="hoordle-key large">
            Enter
          </button>
          <Key
            value={"z"}
            state={keyStates["z"]}
            onClick={() => keyType("z", keyStates["z"])}
          />
          <Key
            value={"x"}
            state={keyStates["x"]}
            onClick={() => keyType("x", keyStates["x"])}
          />
          <Key
            value={"c"}
            state={keyStates["c"]}
            onClick={() => keyType("c", keyStates["c"])}
          />
          <Key
            value={"v"}
            state={keyStates["v"]}
            onClick={() => keyType("v", keyStates["v"])}
          />
          <Key
            value={"b"}
            state={keyStates["b"]}
            onClick={() => keyType("b", keyStates["b"])}
          />
          <Key
            value={"n"}
            state={keyStates["n"]}
            onClick={() => keyType("n", keyStates["n"])}
          />
          <Key
            value={"m"}
            state={keyStates["m"]}
            onClick={() => keyType("m", keyStates["m"])}
          />

          <button className="hoordle-key large" onClick={() => backspace()}>
            <img src={BackSpace} />
          </button>
        </div>
      </div>
      <Modal
        open={showInfo}
        setOpen={setShowInfo}
        page={page}
        setPage={setPage}
        content={modalContent}
      />
      <Modal
        open={showWin}
        setOpen={setShowWin}
        page={0}
        setPage={() => {}}
        content={winContent}
      />
      <Modal
        open={wrong}
        setOpen={setWrong}
        page={0}
        setPage={() => {}}
        content={
          checkingDate
            ? [
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    fontFamily: '"Secular One", sans-serif',
                    alignItems: "center",
                  }}
                >
                  <b
                    style={{
                      fontSize: "1.2em",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    Sorry, we could not verify the international time and
                    determine the solution word with your internet connection.
                  </b>
                  <span style={{ marginTop: "0.5em" }}>
                    Please refresh the page
                  </span>
                  <button className="dismiss" onClick={() => setWrong(false)}>
                    <BulletPoint margin={"-2px 10px 0px 0px"} /> Say less, fam.
                  </button>
                </div>,
              ]
            : wrongContent
        }
      />
      <Modal
        open={showLoss}
        setOpen={setShowLoss}
        page={0}
        setPage={() => {}}
        content={lossContent}
      />
    </section>
  );
};

export default HoordlePage;

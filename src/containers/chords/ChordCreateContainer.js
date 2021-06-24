import React, {useState} from "react";
import ChordRead from "../../components/chords/ChordsRead";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faSquare } from '@fortawesome/free-solid-svg-icons';

const ChordCreateContainer = ({match}) => {
    const [chord, setChord] = useState({
        name: "a",
        strings: [true,2,2,2,true,false]
    });

    const [checkIcon, setCheckIcon] = useState([
        faCheckSquare, faCheckSquare, faCheckSquare, faCheckSquare, faCheckSquare, faSquare
    ]);

    const [err, setErr] = useState({
        msg: ""
    });

    const getStartFrame = () => {
        const min = Math.min(...chord.strings.filter((s) => s !== false && s !== true));
        return min !== Infinity ? min : 1;
    }

    const handleChangeStart = (e) => {
        if( e.target.value === "" ) return;

        let newStrings = Array.from(chord.strings).map(s => {
            switch (s){
                default: return parseInt(e.target.value);
                case true: return true;
                case false: return false;
            }
        });

        setChord({
            ...chord,
            strings: newStrings
        });
    }

    const handleChangeName = (e) => {
        setChord({
            ...chord,
            name: e.target.value
        });
    }

    const handleCheck = (e) => {

        let newChecked = Array.from(checkIcon);

        let newStrings = Array.from(chord.strings).map((s, i) => {
            if( i + 1 === parseInt(e.target.dataset.no) ) {
                newChecked[i] = e.target.checked ? faCheckSquare : faSquare;
                return e.target.checked;
            }
            return s;
        });

        setChord({
            ...chord,
            strings: newStrings
        });

        setCheckIcon(newChecked);
    }

    const handleClick = (e, r, f) => {
        let newStrings = Array.from( chord.strings );
        newStrings[r] = f + getStartFrame() - 1;

        if( newStrings[r] === Infinity ) {
            newStrings[r] = 1;
        }

        document.querySelector(`[name="string${r+1}"]`).checked = true;
        let newChecked = Array.from(checkIcon);
        newChecked[r] = faCheckSquare;
        setCheckIcon(newChecked);

        setChord({
            ...chord,
            strings: newStrings
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if( !chord.strings.filter(s => s !== false).length ) {
            setErr({
                ...err,
                msg: "At least one Open stroke needed"
            })
        }

        setErr({
            ...err,
            msg: 'wait...'
        });

        //TODO: send chord via axios 
    }

    const handleErr = (e) => {
        err.msg !== 'wait...' && setErr({...err, msg: ''});
    }

    return (
        <form className="chord-input-form" onSubmit={handleSubmit}>
            <ChordRead chord={chord} className='input' getStartFrame={getStartFrame} />

            <div className="svgOverWrap">
                <div className="outer">
                    <div className="checks">
                        <label htmlFor="string6"><FontAwesomeIcon icon={checkIcon[5]} /></label>
                        <label htmlFor="string5"><FontAwesomeIcon icon={checkIcon[4]} /></label>
                        <label htmlFor="string4"><FontAwesomeIcon icon={checkIcon[3]} /></label>
                        <label htmlFor="string3"><FontAwesomeIcon icon={checkIcon[2]} /></label>
                        <label htmlFor="string2"><FontAwesomeIcon icon={checkIcon[1]} /></label>
                        <label htmlFor="string1"><FontAwesomeIcon icon={checkIcon[0]} /></label>

                        <input type="checkbox" name="string6" data-no="6" defaultChecked={false} onChange={handleCheck} id="string6" />
                        <input type="checkbox" name="string5" data-no="5" defaultChecked={true} onChange={handleCheck} id="string5" />
                        <input type="checkbox" name="string4" data-no="4" defaultChecked={true} onChange={handleCheck} id="string4" />
                        <input type="checkbox" name="string3" data-no="3" defaultChecked={true} onChange={handleCheck} id="string3" />
                        <input type="checkbox" name="string2" data-no="2" defaultChecked={true} onChange={handleCheck} id="string2" />
                        <input type="checkbox" name="string1" data-no="1" defaultChecked={true} onChange={handleCheck} id="string1" />
                    </div>
                </div>
                <div className="outer middle">
                    <div className="inner">
                        <div className="start-set">
                            <input className="start" name="start" onChange={(e) => handleChangeStart(e)} type="number" min="1" max="24" value={getStartFrame()} required />
                            <span>fr</span>
                        </div>
                    </div>
                    <div className="inner middle">
                        {
                            [...Array(6).keys()].map((r) => (
                                [...Array(5).keys()].map((f) => (
                                    <p data-n={`${r}${f+1}`} key={`${r}${f+1}`} onClick={ e=> handleClick(e, r, f+1) }></p>
                                ))
                            ))
                        }
                    </div>
                    <div className="inner">
                        <fieldset>
                            <legend> chord name </legend>
                                <input className="name" name="name" onChange={(e) => handleChangeName(e)} type="text" maxLength="10" placeholder="ex) g7" required />
                        </fieldset>

                        <input type="submit" className="submit" value="submit" />
                    </div>
                </div>
                <div className="outer"></div>
            </div>

            <p className={`err ${err.msg && 'active'}`} onClick={ handleErr }>{err.msg}</p>
        </form>
    );
};

export default ChordCreateContainer;

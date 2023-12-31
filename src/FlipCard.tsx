import "./FlipCard.css";

type FlipCardProps = {
  image: string|null;
  style?: React.CSSProperties;
  animated?: boolean;
};

export function FlipCard ({ image, style, animated = false }: FlipCardProps) {
  return (
    <div className={`FlipCard ${animated?"FlipCard--animated":""}`}>
      <svg viewBox="10 10 54 89.4" width={256} style={style}>
        <g
          id="g94"
          style={{fill:"#000000"}}>
          <path
            className="FlipCard-Top"
            id="rect90"
            style={{stroke:"#000000",strokeWidth:0.264583}}
            d="m 13.00024,9.9999064 c -1.661994,0 -3.0003336,1.3383396 -3.0003336,3.0003336 v 25.999963 c 0,-0.830999 0.6691676,-1.500166 1.5001666,-1.500166 0.830999,0 1.500167,0.669167 1.500167,1.500166 v 10.999846 c 0,0.830999 -0.669168,1.500167 -1.500167,1.500167 -0.830999,0 -1.5001666,-0.669168 -1.5001666,-1.500167 v 2.999817 H 64.000228 v -2.999817 c 0,0.830998 -0.669169,1.500167 -1.500167,1.500167 -0.830998,0 -1.500167,-0.669169 -1.500167,-1.500167 V 39.000203 c 0,-0.830998 0.669169,-1.500166 1.500167,-1.500166 0.830998,0 1.500167,0.669168 1.500167,1.500166 V 13.00024 c 0,-1.661994 -1.338338,-3.0003336 -3.000334,-3.0003336 z" />
          <g className="FlipCard-Bottom">
            <path
              id="path130"
              style={{stroke:"#999999",strokeWidth:0.264583}}
              d="m 9.9999064,56.399658 v 3.000334 c 0,-0.830998 0.6691686,-1.500167 1.5001666,-1.500167 0.830998,0 1.500167,0.669169 1.500167,1.500167 v 10.999845 c 0,0.830998 -0.669169,1.500167 -1.500167,1.500167 -0.830998,0 -1.5001666,-0.669169 -1.5001666,-1.500167 v 25.999964 c 0,1.661994 1.3383396,2.999817 3.0003336,2.999817 h 47.999654 c 1.661996,0 3.000334,-1.337823 3.000334,-2.999817 V 70.399837 c 0,0.830999 -0.669168,1.500167 -1.500167,1.500167 -0.830999,0 -1.500167,-0.669168 -1.500167,-1.500167 V 59.399992 c 0,-0.830999 0.669168,-1.500167 1.500167,-1.500167 0.830999,0 1.500167,0.669168 1.500167,1.500167 v -3.000334 z" />
            { image &&
              <>
                <rect x={15} y={56} width={43.35} height={43.35} fill="white" />
                <image
                  width="43.349991"
                  height="43.349995"
                  preserveAspectRatio="none"
                  href={image}
                  id="image1-6"
                  x="15"
                  y="56" />
              </>
            }
          </g>
        </g>
      </svg>
    </div>
  );
}
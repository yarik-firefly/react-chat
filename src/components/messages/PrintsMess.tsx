import React from "react";
import "./PrintMess.scss";

export const PrintsMess = () => {
  return (
    <div className={`middle-section__correspondence`}>
      <div className={`middle-section__correspondence__avatar`}>
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAkwSURBVHgBPVfZclxZEcx77t77IrWktix7vGIGOyaACHDwwgMvEMG/8An8Fy88TAABAQzMeMbW2JIsyVartfRy932yTjvGDi2tPvdUVVZmVrXxp9+9bEyjgQnAbhpYqNDyLDx6NoVlJEgrA6ouUcQ5WlsD+B0PMGtcLmP89dsSaWHidj7D778Y4WC7iyhKcDFfwBtP0cyuUEQZeC1gGKgZRZmW/Mq7lYIBvlNXOqjDIFvDHpymQBaVUG0Pnd0h0jDD5cklLNfBKjHw1Y0Bq92H55qwgjYOlwqPn28jOfmA6cEQvckY9ZaLs69P0fCZfBHw/k2sWgLXVQnLstAw8PbuCFYRotdxkN4GuM0r9HgwmpeoLBt1p4UvjzIduLu1Da/lY34xQ8d3sdszcXZ4xgIK1BEQx5eYDHyMDrpovAFWtRRSs3oWKcjW/FnVRI+VI4/QarWQrmL87zLCOQ/aVozG8VCaLirDRJ8QlsUNXM8jPo2uwHZ8/P89z7GINAngttpQZYA//uoAin9L5nO0OjaKjLBXrLgh6C8f3fuzuWkBHH55hHoWl3gVmWj8HmqvjYTYFMrAF50SJR8MVrcgwkygwnq1hs1qxltjRHEMiz0s4oA3KnxzcoW4bNBpcjgQMAydHKPBkpxrwmw0JVZpg4Ht4TWhsntDJEkGo6x4cYZfTtp48XAH4+mEBHmO2/UK66RCmvbR9k2slmzR43twjRyz2Rr/OA2xaPq4TGoiuMCLXo329gDrmxwmq5TmQghmM48ne13EWYWrVQDf6cFyLLRYzR9+uodh30V3Z4DBdMrzNobTfRalUJY5yixCGt2wWlbE+3zbhsfK//LmAnVriHmkkFcF/MUKVVzAaQnNeKBms1dxioIwphnx91tI0gx1uMLnQ4WDB1Moy4Hf8vhAhToLkSUhz+YoipocqUlQgsnLpRCTd+7s9HG330HCMzmRKw2FOC1gOgqNIY0QqPnHslb4jj1JihKG7aDTbcPiu88IMfuBVq/DHIkLgxhCiKYiRiVVyASFnUIzYX6pqFcDhmnCU9JPJsZkmoKkEjmJfEVO8oyS/5RUmJVoVol+3eQ0DM9BmRfIwwCKpkLcULBS5bZ5MXRwZQnLmCwvd7rUbtvAepnDSOkJSiTTaGLRNvjNZFDerizKSXLl+zb7YhniXhUmZYhZWKLPXhh8nWUpJgf30Rlv87BN1d3CZHsM29JmYI52oYhSFi9Azeh2GO0e+0w1RCv+rHURhWjY2EhIiXGImUlgqXqr7eA3D8bwKaOWqhCuIzTsmUXc8zTiT1bmd1m1g9omMrzc5LO1qJr3Lj9eMrGYNpuSoBb8KscjapjMEM/SQQ1WKkRk6fxGCKRylwFSEq1LPX82bPNyE8fzAP8++gqZJMnKXDrY3ekIu2S663s4mR/h6OwWsw+XsJMI/V4Pn9+JUbEt066FO3Qwxawq6TF7pN1SY86aad8opU+uy2pdbAdLDFsmdQpeGvDvZD5hTlYh1sdznB7P8NtfPILnZ/j7l6+QkKq+T7hpOuerCOFyhc86wD0ODrMsNLEaQ08FCK0tk5pUqtZDQnS5zuhebo0JTUGJeTCxFw8nAgWuUmidPtntYnZ4hAkv7XT7+PXBCQfJNq6CjbONFDVLYoU0meUipFwN6pihFd3QEFZBlNKgoERMBhbIr+MMbbPBeNDWehyN23jy8jkW17e4S3tU7P1gq4/8wxk89rZFh+tR99tdh0Ohi/UiorncYY8LLGY2bm9jJGEMmzNAkm44HExKzdKlVxVystExlSbImrLqcM5S0iRHhTiIMX34VJt8Hq+xYFDXs2FIz01Htyjj2LTZz90HB6goryIMabk0GBJNdCuEEkY3Wv8MXJF1DXsgxiAXWMxmycB3DJ+O1GCxzHDx/SEchyymCWTJCsFyiYgu1EsDhPNz5NT8+naNFl3KoVYbGk+VZzg6voCQt7Y2/TWkz0Iymf1FLrqTOWlg49u8nMkdX8e0PJdzNUdws8bF0Vu0aZkFkVmyuoLnbTLcNCgU9jWjfMQklh/nMKnZ9+9nKLmN2KxUM5nBTNPezGMWqaQqeRDCNwZWwjySjIOHhlSyj2Q2EYjClBAm1HKBkt6rK/MH6N79GfrDjm5LRU7EPHf0+gTBdYAOLbTQ91faVpuq0uNS/omC9ZCQoJb4qDgSmUxUWYVBv+U2kRR6jgp8YpMBZ+yca1HDUVqG13h3vkDBRcGiFCkERAFRlFpYWS0kVmKTSluk7rXM482bzEbcRPQsdsY+i6GEDDhpOXxN1+LQhzXG3r37UM4J3nC3+u8/v0NUv8ak38W9nSGZ63K94UjlebHSnEhtLLn5kdGiZIOyssSL9Rf/l7ICye9KaZtcknMVH1aOCZNx+5M9JNwy6LPYI4PjrMDusE+b5boURkyOQicJba4yRV5hs1wamqQWIZACTc02vc1W2vDFSbWP2hsiVFWlM00MyoXBV+zdxds3+M+bDxjTSh3Hlm0LlbA+rxGR6SH1Ompx2LCigJbXWJvApix2ArOeENiga+r1FptdSCAQ5hkCP99kZZP9LVzMApzSr3ucr0/J9LLMWC2/mHfMJNs3Bfo0kDv3hzg9uuIYpX7Zf6lLLpdWSRwtHGxGpSXiFgMXN5FJU35itiz5Mk9NTqH7j/aRfv2We1aBg6d7cIYDnvcpG5eDP0W2XHCdoY/Tbxc3J7jgerM/dPU9UkCDT4gqLVzdZyUDXDNaPk0wk1wqZy9cPjTqkixJonev6bSHjD08OzynNmsM9vfQmUzR397BYGcHfm+Ed4fvcczkdDVGrQmlZFmQochp15DyDYlUsI0ci6Irfmzh4aeUg9BsTkgP9vvocTbrROndXquL/qjG+ewazb9e434UwR1N5FE9YN6/eYdXpzfocEYPOcedotysQHy9kSt03fUnmVEgDZ61O6SJgb4M+wGhvdvV/hpHObQgeLHT5rgsPIzyIT5eXeH0b99zfB5r6SVpjkUS4/F2G+EqRZ/jc0TLTYlQScORMwaXjJwBC/kcxkKsn/coB8plXQr7uPMOHTJaPFsWUC7nZKzFXbsyOOr4UcXv1JjmHSy4qn68qhFS3wMi85PdPsZcEL+5PuMqxBbRWkc2FwDT0xuroxy06XY5GZbRAX8AYmMSh+xfwEIAAAAASUVORK5CYII="
          alt="img"
        />
      </div>
      <div className="print-message">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

export default PrintsMess;

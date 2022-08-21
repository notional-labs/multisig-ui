import * as _104 from "./epochs/genesis";
import * as _105 from "./epochs/query";
import * as _106 from "./gamm/pool-models/balancer/balancerPool";
import * as _107 from "./gamm/v1beta1/genesis";
import * as _108 from "./gamm/v1beta1/query";
import * as _109 from "./gamm/v1beta1/tx";
import * as _110 from "./gamm/pool-models/balancer/tx";
import * as _111 from "./gamm/pool-models/stableswap/stableswap_pool";
import * as _112 from "./gamm/pool-models/stableswap/tx";
import * as _113 from "./incentives/gauge";
import * as _114 from "./incentives/genesis";
import * as _115 from "./incentives/params";
import * as _116 from "./incentives/query";
import * as _117 from "./incentives/tx";
import * as _118 from "./lockup/genesis";
import * as _119 from "./lockup/lock";
import * as _120 from "./lockup/query";
import * as _121 from "./lockup/tx";
import * as _122 from "./mint/v1beta1/genesis";
import * as _123 from "./mint/v1beta1/mint";
import * as _124 from "./mint/v1beta1/query";
import * as _125 from "./pool-incentives/v1beta1/genesis";
import * as _126 from "./pool-incentives/v1beta1/gov";
import * as _127 from "./pool-incentives/v1beta1/incentives";
import * as _128 from "./pool-incentives/v1beta1/query";
import * as _129 from "./store/v1beta1/tree";
import * as _130 from "./superfluid/genesis";
import * as _131 from "./superfluid/params";
import * as _132 from "./superfluid/query";
import * as _133 from "./superfluid/superfluid";
import * as _134 from "./superfluid/tx";
import * as _135 from "./tokenfactory/v1beta1/authorityMetadata";
import * as _136 from "./tokenfactory/v1beta1/genesis";
import * as _137 from "./tokenfactory/v1beta1/params";
import * as _138 from "./tokenfactory/v1beta1/query";
import * as _139 from "./tokenfactory/v1beta1/tx";
import * as _140 from "./txfees/v1beta1/feetoken";
import * as _141 from "./txfees/v1beta1/genesis";
import * as _142 from "./txfees/v1beta1/gov";
import * as _143 from "./txfees/v1beta1/query";
import * as _183 from "./gamm/pool-models/balancer/tx.amino";
import * as _184 from "./gamm/pool-models/stableswap/tx.amino";
import * as _185 from "./gamm/v1beta1/tx.amino";
import * as _186 from "./incentives/tx.amino";
import * as _187 from "./lockup/tx.amino";
import * as _188 from "./superfluid/tx.amino";
import * as _189 from "./tokenfactory/v1beta1/tx.amino";
import * as _190 from "./gamm/pool-models/balancer/tx.registry";
import * as _191 from "./gamm/pool-models/stableswap/tx.registry";
import * as _192 from "./gamm/v1beta1/tx.registry";
import * as _193 from "./incentives/tx.registry";
import * as _194 from "./lockup/tx.registry";
import * as _195 from "./superfluid/tx.registry";
import * as _196 from "./tokenfactory/v1beta1/tx.registry";
export namespace osmosis {
  export namespace epochs {
    export const v1beta1 = { ..._104,
      ..._105
    };
  }
  export namespace gamm {
    export const v1beta1 = { ..._106,
      ..._107,
      ..._108,
      ..._109,
      ..._185,
      ..._192
    };
    export namespace poolmodels {
      export namespace balancer {
        export const v1beta1 = { ..._110,
          ..._183,
          ..._190
        };
      }
      export namespace stableswap {
        export const v1beta1 = { ..._111,
          ..._112,
          ..._184,
          ..._191
        };
      }
    }
  }
  export const incentives = { ..._113,
    ..._114,
    ..._115,
    ..._116,
    ..._117,
    ..._186,
    ..._193
  };
  export const lockup = { ..._118,
    ..._119,
    ..._120,
    ..._121,
    ..._187,
    ..._194
  };
  export namespace mint {
    export const v1beta1 = { ..._122,
      ..._123,
      ..._124
    };
  }
  export namespace poolincentives {
    export const v1beta1 = { ..._125,
      ..._126,
      ..._127,
      ..._128
    };
  }
  export namespace store {
    export const v1beta1 = { ..._129
    };
  }
  export const superfluid = { ..._130,
    ..._131,
    ..._132,
    ..._133,
    ..._134,
    ..._188,
    ..._195
  };
  export namespace tokenfactory {
    export const v1beta1 = { ..._135,
      ..._136,
      ..._137,
      ..._138,
      ..._139,
      ..._189,
      ..._196
    };
  }
  export namespace txfees {
    export const v1beta1 = { ..._140,
      ..._141,
      ..._142,
      ..._143
    };
  }
}
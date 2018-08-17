# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Route.delete_all
User.delete_all


user1 = {
  username: 'Guest',
  password: 'guestguest',
  email: 'guest@guest.com'
}

User.create!(user1)

user2 = {
  username: 'jeremiah',
  password: '123456',
  email: 'jeremiah@jeremiah.com'
}

User.create!(user2)


Route.create!(name: "First route",
  description: "Finish at Benders",
  length: 32185.0,
  polyline:
   "cxteFv}_jVoKrJcHfGmErDQPKUyE~D{BnB_PhNuBrBkBlCwG`KqE`LgBdHaAbDKLIF_@fE[rDW~Da@nBE|BBDG|DGjEYx@Ej@FJpBDf@KZMrBb[d@|INx@hBbEh@vAP`ACrCw@tCm@jBJb@_Al@uCl@EtHDZbDrEtA|@^B`@Cl@i@TIh@Kx@ATCBDLGDRHJFDTBXEj@j@\\A|@NNVHZD^VINECW@EHGMgBLfBIFADBVODWH@P@\\O`A]d@yA\\WCHFJHLn@Ip@ULMLCFUXOPEp@{@fAZnEYf@{Cd@qAPUPZpGeC`@IPl@hJJAFl@MDvBj[nCYr@dIv@xLXbFh@jGdA|LtExr@XvC~@~Al@zABdAuBf^k@|Ex@dAo@xCi@bA{@t@a@r@e@~@YP]HWGgBB{@Pm@j@i@vAyA~Ci@Ra@VcCdEUt@PfAAp@g@~Ao@`DC~@@`@PJ`As@RCF\\g@dAMd@FPA^e@`AUy@?SNFRBc@K@\\Rn@^q@DS@[EKAKDSn@iAA]T]|AlCt@v@zA_Bv@fArAX|A~@d@Ln@GZSZi@Dg@?Qd@?d@@p@LxEbCvA|@p@t@j@n@x@f@xCnA~AjAd@NzBRtEhBd@Dr@QpBo@l@Vj@xA\\\\hBr@~@P`@JPTlAzBZHfBKtAKr@H`DtAnCXdLhCdG|AfAl@|@z@pAhC`@|BJrBBnA?v@xJWPjLNrDLBj@RP?BTFnADzDCbBMh@V?pSo@ZnR`Ann@f@dUNpIh@tA`@tQ@v@dB{@t@]Bx@?VR?jCjArC|ASz@]k@SKUBIR?n@MNW?YDgA\\b@bAb@lALvBLnCl@l@z@GfB{@TWjAwAnAmAj@{@n@m@lAm@xB]lF]~CF|D?|D]rDSvLgAxEm@tFU|B@bDNbBAxHc@ze@aDfV}A|@?BDJBnIi@fe@}ClDUvAE`BA`C[|@KZGnB?nCOzC]pBCn@IzAQdAB`AKxC[nCKjAKr@TBLRHPKEyD?_Ct@@h@F?VFR^LfJh@vAXhADf@@Rb@CNCJs@VmB\\oBPe@@MJeAO_Gw@eEBeIh@i@DGe@PK@CDMAM@OU@K_HImF_@oVq@ob@qAay@aB{aAc@mZIs@{@}CQiAFeDd@}BdAcCr@y@m@mAy@eC[aBa@qE{AqY_@uDc@iBiDcIw@gAyEkCcB_BqCqDuCoF{AqDe@oBg@eCSuBy@kHoAqI_@cDDuBPwA?aAYyBsGaHq@cB_@iBIuO?_BWyL_IZ_DNKeFIyCOyFcAsb@AOIqEaI`@K{EImCQoI[qLkEReDL}H\\oQx@_I\\g@sSIsD",
  elevation_gain: 573.900524543598,
  routeType: "bike",
  user_id: 1,
  duration: 7967.0,
   marker_string: "37.79476701046419,-122.39335983569333,37.761835065247546,-122.41738857335622" )

Route.create!(name: "Paradise Loop",
  description: "Beautiful sunny day",
  length: 73901.0,
  polyline:
   "qvteFzb`jVBX{AKwAcBiFxEuEbEaJ~HaSxPiZ~a@cGtRgChYs@zM`B\\~Fff@bDjI[zGoDnGaBxIfBpCdDnCxDdA|DnHsA|A}@vJ}F`As@nHKxKKd@tBd[H@hCYr@dInAbSX~Ez@|G`Hd`Aa@fp@eG~IiF|@_GbJoDbReAdEvCdDcDn@uCbA`AUzE{BRp@y@k@m@cDn@xAqH|DyhBhK_i@bIqBbLqDzCuEKeEuBsK_@sEyIi@gQmFqCuP`B}F]eHpDc@|JsJH_EyCMa@eBk@sMeCsUxDMDoBcBgArCl@pBaD~EaAzBcBrHoF|O_I|TiAjWsN`YiYdYgLjFgSdXad@jq@}@zDnALzCyBg@hDeC|BsAjAmAnG}CnDyCwFoIfI{PzT_HvBgo@bGwBHcBVeUvAgLoNwDoHNyQxDeV~Ekd@dJqRzHik@bKwJ`H{LgA{NcH}NCwBdAPnAwBnJkOvHeQnJ{IrGuNt^gl@|Ymn@rDiCnMkOzDyHrC}B~CjChDmA`D_DpDaGgD`BkBU_BdDXyD`AkBBGBA?GAUs@aK\\MIc@~DgYeGaHoMcAmEsS{DyAwFbBqHkJgErAkFnEsA}CkA_Dp@{EiB{B_FlGuAjGkA|HoCGcCaA}CPqBZvAbEG`H{@nDmEoDwBhB}@vEiAn@oF_EcDjCtAzIuAxLnErFqB~Dz@nGkIlJQtSeIRkDAoA~EfFfNy@nJsCtDaCjDcGx@uH`@h@tIj@lHoEfBsHiCoCtEKrXgApBuIwCkFrIeEcLuCsAmAdFaFm@_BuFsD|AyEjG{OdBiInBNtHoGdJcItEgEzFX`Oc@nWkDhXxJfh@aAvQ{BxOuGxHoRjBeNhB`Kz`@wA`gAaD~EbCnARJnAnCoAoCPU~@@r@KRm@VqArCzAzE~FpBFzD_FtBhB~CI~AaAj@uF|EMxD_GQiErC_D`HdGbEeCnJnD|AfCnCIhBq@d@lDnQMz@dCnEkC~KmGn[~LlPlEdUPpAa@bMuYjFgBhKuAxBaDld@{n@tGcJtg@iu@|G_KbG}BpMgJnUkTzLyUp@iSnUkw@rHqLrP}EfRbBdDxB|DnC`GBjBCXkJjMwExInAfHeCpFhB`AtOtD`LhK\\hFbCdJ_B~CeIp@eBlHuEdlA_Ivw@sEtJqDnB_GRs@`BrCrBQdBr@lBn@rD?jDs@`SdMfN_FbOdBjIoJtF_AbPtArJ_Cr@eBxj@uBvb@qAQiKc@eXIaFzDaBlFQdBYPwCdAwG~C{Wv@qKo@uTqA_FgA}IsCc`@oByZx@gC",
  elevation_gain: 1937.41262199357,
  routeType: "bike",
  user_id: 1,
  duration: 16266.0,
  marker_string: "37.79449571255364,-122.3942181425781,37.7730983479005,-122.44098575638151")

Route.create!(name: "Bobcat Trail ",
  description: "Fire road run",
  length: 4820.0,
  polyline:
   "c`}eFzgujVGx@?\\ALaBhBQXCVCLPNb@\\tBpBtAlAv@r@PT\\j@Vn@Pr@LvBn@rDP^l@p@nApAX`@Rt@Z`BJh@Nb@TZN\\Xx@Pt@Nz@Hf@@b@F|@Ff@Jz@D`ABVDPBd@D|@?~@DzB?zBIv@Sd@o@`AYb@M^]|ASf@Ud@Sr@UtAMh@[\\g@Lg@D[?WIUKOCIAs@q@u@i@w@g@wAk@cFcCqBi@aAWyAe@q@i@[c@Qi@EYAc@Ci@IUIMUQc@QkB[cAMs@a@k@c@g@i@[c@IQMq@Ea@?sBEm@m@_DQe@q@kAWi@[y@Sy@Si@Ii@Io@}@cDc@uASg@_@s@_@e@GEK?KFGJCh@Gt@MVq@|@eA`BURg@R[@a@E}@WOKIYCW@{@M[]k@]{@YcAMWMQ]Sg@KY@aATY?MEIKAQ@O\\UHK@UOYMMm@IcAMOIEKIm@Ao@YmACU?cBEIIGM?IFSZi@\\oC`AUFg@D}@PQB_@?[EQG][]k@]iAMY]UWII@ULuAhB[|@KPGD[BOASGWUMa@OcCK]O[[YkAk@RE",
  elevation_gain: 349.306962966919,
  routeType: "run",
  user_id: 1,
  duration: 4023.0,
    marker_string: "37.836915496863455,-122.50256141502877,37.853733893937935,-122.5035177087135")

Route.create!(
  name: "City ride",
  description: "End at bow and arrow",
  length: 24564.0,
  polyline:
   "copeFnhijV@nALd@Ft@Bv@SFm@P[HH`@?^Gz@PlE\\`HDv@Rr@^dAKxBHr@NtBBfAL~@f@hANp@@n@KzAAtBHz@G?@\\@HN`@BTHlCDt@_@DvA`Ft@dCdAhD\\xADbEo@bJgB`T_@bDuBvL_@vDHtEDnFFnBJjAr@|BhAnBvChFx@lCDh@Ar@OjAaAhE}ApFMr@C~ANjDd@lDVvAbAlD|A|FnAzFNxBCbBWhCKhBDbA`@fCBbAMz@aAfCu@fBc@zAIdBFbAPhEQxDU`D?tBPrB^|CZbBf@vB^rB@pCB\\j@`AdAdAp@v@x@dHr@xEpEnSXzAbClPx@bGk@v@]ZwBdA}BrAaEbDwBfDcArCg@rBIz@TALEz@GhBOCy@wCT`BKt@IBx@iCPi@Jk@BiAIa@Js@HSBCIECSEs@DWAs@DgCRMEk@c@Bc@Dm@E_@IIG_BYiPmAot@mAqt@g@wYGuEeABoHRwLZcK\\mVx@sHTyJV?w@CoAEkAKiAQ}@Y_Ag@eAw@aAiAw@q@YsBk@qNeDkDa@s@SkB_Au@Mc@AcDT[CUMYa@EPEQo@sAOKWA_AOcA]}@k@q@gBMOk@GsAf@}@VcAOwEeBqAGu@Q_CaBuAk@}@Y}@YYQq@mA]SgAu@kAk@uAm@qAFUPUZO~@KPy@P_AKc@Wo@a@YAAKGQAMFOL_@QIOGo@Ia@Si@{@YZaAbAq@q@aBsCqAtACXCFIFMHLIHGBGBYt@_AEAMDu@r@K?QKGIBK@K@]F{@h@gCf@_B@q@Ok@A[Tu@lA}Bt@gA`@Wh@SPQfAmCh@wAl@k@z@QfBC^V^Av@a@b@{@l@s@zD{@~@?p@Fb@In@DEQSg@Gg@DgA|@cB`@iBiDQcDlCSROMa@m@CODMVkDRaBp@kLz@oOA_@Ow@Ua@i@s@Yk@UiAUyCoFwy@u@yFqCyc@wCXGEsBa[LEGo@K?k@qJDIlBWZEAo@Y_FLSjFu@LIVi@_@oEQQUQGg@EcA`@IVLJ@n@KBPD@HCRG@QBGDEPKJIHq@Mo@KIWKQSYu@UqASc@YOw@@m@Ka@_@]]a@BO?E?ICy@c@[YqCuDQ]E[JiFEkA|ASv@Y~@m@Kc@?Ql@yAh@wBL]FqACaAQaAcBaEo@yAOy@e@}I}@gNu@{KQDSL]DaAAs@GE]`@oAPaKCKB_CXo@F_AV_EZsD^gEHGJM`AcDr@_Cr@eDpEaLvGaKjBmCtBsB~OiNfOoMnR}PbH}G~FgHpGgId@YbDwA",
  elevation_gain: 419.287523031235,
  routeType: "bike",
  user_id: 1,
  duration: 5343.0,
    marker_string: "37.77299176607655,-122.44116863828424,37.79025175380468,-122.38865788001294")

Route.create!(name: "City run",
  description: "Up and down",
  length: 8986.0,
  polyline:
   "klueFl{ejVhAOB\\pAdS~Bj^pA~Rf@fIlDa@tJiArApSlAbR~Bn^d@dIp@rG`@lDdBpOHBTEADA@EBWBz@dH`AdIP|AB^?T?J@@DH?L?PLlARtBENPz@Lt@zBbSJLLnAhEj]L`@PnADZLVA\\Dr@`@hCV`CBdAHd@LZFD\\Zd@f@LFRB^D?\\@XLrIf@`Zh@`Zd@pYDpDBPB?L@FB`@NJBzHUrJUvJ]jK[bJ[FdEJvER|LPhLTlLF|F\\hQf@vYFtE`CG",
  elevation_gain: 180.661376953125,
  routeType: "run",
  user_id: 1,
  duration: 7123.0,
 marker_string: "37.79801900148025,-122.42344299728393,37.77473432254374,-122.50556547409059")

Route.create!(name: "Run 2 ",
  description: "Another run",
  length: 13588.0,
  polyline:
   "{uteFrhajV`LqApDc@X?tAQHAJKRZz@fAtBvChAzARXIJPV?Z@TBj@JALJHtAFx@RhD|ArUJbBNxB@R?Cb@|HJxAn@rJXbE|Bx]@Pz@KiANnAbSfArPnAjR`BpVxAbUlE`r@lA~Q@PoDf@aCVGHEFGJKb@ZtBHHFBERFTBNJJGr@d@~CZfBf@hDl@fEPvAHjADnB@jEDdE?PM@HvER|LJ~E|BGBjANhJRhLd@xY\\dSj@r\\PpKBnB@v@|BGdDKzBGja@oAtJYEqCCeALAI}E]uSEkC_@wTCqAEwCAWl@CA_@@WTYVc@JKFGCo@?a@FgAXmCbAaFhAuGf@cFXeD@m@H{BBa@LANAb@UL[?s@Bw@By@\\aF\\kDFq@DSDI^IVGJEAMBAGUASHGFQPc@@QJgAHk@CaAC_@D?i@mIsAqS{@_NuC}c@eHggA{@eMJEAa@XIR@@@@B@EBC",
  elevation_gain: 251.020485401154,
  routeType: "run",
  user_id: 1,
  duration: 10648.0,
  marker_string: "37.79436006322475,-122.40039795214841,37.7731056400993,-122.42645871948241"
)

Route.create!(name: "A new route",
  description: "In the city",
  length: 12096.0,
  polyline:
   "unteFng`jV~JcNiCmDoBkCMQ_CzCcBnBwAtAoArAiHrGiCdCsGxF{P~NcLtJcFtEuAjBwHfL[l@_E`KUt@o@rCWv@Sv@w@bCANEHEDIFCBUbBUvDK~@c@~GYn@EzB@@BJQ`KEZYn@AVBHDBd@Bx@Dj@GJCHGHEHAB\\j@hI|@lNZ|FR~CDVXv@lAnCj@rARbAFhACbAGb@GD_@`Bw@pBAR@JHZi@^u@\\g@NmALBr@IzFBZHTV`@xBpCPXJFz@h@LDL?j@Cp@r@ZLTD|@?NDRNHRPbAX~@T^PDNJPd@@\\EVKNCBCBKFILAFAJMDI@CBEHAN?RERYVc@f@?@\\zD?TQ`@MJsEn@[FGFEJ?JZ|FADqBXYFAHj@fJ@FLABn@MB?HfB`XJvABBH@pCYrAnSf@dITbEJr@ZtB^nEzEzt@@ZDb@NtBFj@L\\Xj@v@dANh@F\\@^mBz\\S`BSvCI`@CDFH`@l@NLRSpAeAjAeAVAvCPpCLzCRr@Bz@B`@NZb@Pt@@^Mx@Kn@D`@LXd@`@r@d@ZH`@?`@EXILIP]Pq@NaAPmAJUVO\\?THxBlBX^p@pAZr@LNJFb@CXO\\Gb@ARHVRJPPSNQR]@EH@HANGvAqAVUNET@l@`@vBnB`@j@Xp@^l@LJbA\\`CfAtBhAlAp@p@`@`@JRXVVt@h@XJn@Ln@FlAHzAp@fAd@h@j@NNPJ`@PXVTp@FXrCKR~Lf@xY|HW",
  elevation_gain: 196.62269616127,
  routeType: "bike",
  user_id: 1,
  duration: 2718.0,
  marker_string: "37.7933426853193,-122.39481895739743,37.78438915567138,-122.48004883105466"
)

Route.create!(name: "B to B to B",
  description: "All over in a Z",
  length: 38081.0,
  polyline:
   "mkqeFfmsjVqN`@gJX?QGaESmLeOd@kCHI?CQDw@@c@C_EMaCYAm@UMAMiK]aSqA{t@o@u`@e@}Y[aSMmHEiCoADk@@u@aMsAoSiDmh@}GseA{@qMY_EmDb@gGr@wAPi@iIsAqSqAoSWkDQiDi@{HnDc@nDc@zIcArC]f@Ii@gIc@uGEq@i@iIcBcXkAcQQsCImBvDg@xBWKgBJfBbAMScDS{CFDB@pAO|AQR|C\\fF`@xGd@dHfDa@lEg@rLyA|IgAhE|FzEtGfJfMpW`^|DpFLf@JjAlAnRfC|_@`HdfAbH|fAn@tJB`AUrBSt@GPEDCJFn@QFq@NGLId@S`Ck@dIEfCY`AMvDApA@fBSdAWr@WrB_@hAkA~Gg@zDMrCAnABvBFfCBbDF`ARdA^fAdDjFhAtBr@|BHjAIvAo@xCuAjFo@lCI`BJbCRrBf@bDrApEzAtFz@fEZnCChB_@dEAbB^fC@bB[fBk@hBY^i@vAYfBHdDHbDYtFOjDNfCl@~D`AfEf@`BRh@pA~B\\~@P|@ZxDXpCh@bDLx@`AtEzArHfA~E`@`CvAk@nAi@JZHTFDhACVFv@~AFp@QpAGdA?b@DLd@`@@dDDrBNxBf@bDtA`G~@dDVRj@@FdEvTuAfm@_E`CQDJHFfCMvOeAd]{B~BSZD^Er@@l@Cx@QfAIt@ADEBENCHANCASCu@vAGvDW`BQpAEtAOjAEzBYPK@CDMAM@OU@K_HImF_@oV[}RYmQq@qb@qBanAKmFc@mZIs@k@eBOw@QiAC}@JgBJo@h@oBt@aB`@q@PGm@mAy@eC[aBa@qEMkCNFj@Z`Af@bAVz@HjAApAObEe@`CqEdAcBvAwBlBkCdBmBjA_A~@m@d@WYg@Uy@Ck@Fy@NeAC}@COLM`@Yr@{@f@_A`@k@|@k@jAYhD_@NECQEi@GaAKaCCmHCqm@E_e@@gMB{A@g@OOW[EKsBeHEu@b@{BAeAI_@OYeAeBqAiCOOICUe@{A_EoBkF{@oBq@wAwAeC{BsD}BcDyAkByA{AuAkA_CgAiBe@yCe@kB[yAYgBi@mGgB{FyAaGwAeA?{Kf@_AHMeFWs_@GiJOqZCaFEsCQeAoAoFSuAkAoLQmBCu@@cBAi@GaEg@cUWyJUsJBSEyCOeDAKMaEDuFCyBYcJY{EaG\\}FP{DRgYnAUmJh@e@X]HWBa@O}F[Ew@@]GOMaDLuBJ@ECwAC{@@GTCr@E",
  elevation_gain: 706.948352813721,
  routeType: "bike",
  user_id: 1,
  duration: 9486.0,
  marker_string: "37.777334095526875,-122.49352424914548,37.758912988278176,-122.3825756555176"
)

Route.create!(
  name: "Three Bears",
  description: "Long ride for the weekend",
  length: 67830.0,
  polyline:
   "c_}eFnwfiV}Cs@{CRqYrBsZtBoHh@wDVkAwPkA_QwAwSyBsZiBcK{UoQ_O}KDmInBaIdKoN`IgT~OgTxB}OzB}Sw@uC@aC}AaBu@qBgCdAs@_AsBmCaEpB}@eDcFl@E_FsD}CeH|BsHc@yG{E}DgA|@bGvCb@vChHrEbDdBVgD~BwHsAqE{BsHeC{EkAgAsEgC?_DvC_DmAZoFgIiIs@}GbAk@vCzAlEJhGiDzD}AzD}J~HgTwEfNsKzRqMxE{F{BcAmA`B{C]qByBtCiGhFmDdD_C}@sDfDR~CsGrBiEpDuEyAqCcE_Cb@sJpEkDJ}@yARqD~@uFpAuFsAuAcE{DjAaGf@wDkEoAyDmDkAeAe@uAjA|@dBcAjADNuHFaD}E{CwC{@kBwHx@mMoBwJpC}JK{AqCxDgLdHVgHfBwEiA_HgB{EbAgFnCkDwB_@sFr@uAgCxIqHuA[oFbAyKtKsFzUeGfRiNfRaM|IsNjN{Db@k@q@iBuHeAgFqJz@}GzG_MzMyFu@gD}G~@mOCiKcUgQmNeI}MC}QaSkKoEc@oEfDqI`Gm_@jLcwAsBaViI}]eYsOwU|@yLvM]ha@iJzWcEtG_ClMaI`FaErEc@fUsGhK_f@kEiMq@qCrAiFrJ{G~QgPxb@_T`UyCnHyOvC_QeFyBOkBxEqErJgCfLcHbMwI~HoB|F{Hd[hC|RiJnYqFdDiCnTBpGgFzH{@hH`FxRdJvSZxT`ClGv@bAnAs@pMFtStMlDjHOlRtBf]dEpY~ErEhFzNlCvG\\fKjDhEhIbNjCvCnE}BlMyEn@~Bo@_C{ExBaM|EhNbHfCGhB_CbK{Ffb@oRpJ{AnDcG|H_Up`@aQ`PcGlEiHjI{DbKoAzG{SzGsHvK}EtFmM|NeStEyCrCaJlGiY~HiJzSuCxJeIrTm\\rB_NxC_`@pGcUxMiOvDiMvAu@Bt@sC~OZzDN|C_BfBnBbG`CzApGxHcIrC?vNtEvAqCbOaFlHzB`JnEvE{AtE_BpOq@tIcExDuDtViGtGaKtFq@`DhJxRtMzTdFmBEeHlDgBtJ{Kz@eFnTiM|CdIY`F_BlDv@hDlIzN]pJbCxCIJnBdAx@bDfBgAbEHMvCuBbAz@bAfDd@w@zBd@vCMfCjG|EO~G`CR`HwFl@mBfCxFtCdLvEs@OlE~KMd_@aGrF_C`C{FpHoFt@oChD{FpBMzAlALrBjAxDzJmA|G}@jK^fPoAbOe@dAD~F_AvPgB`@zFZzExL_BjBvD~AdUtB`[rIm@fYoBvf@iDt@s@]eCNO",
  elevation_gain: 2106.97352981567,
  routeType: "bike",
  user_id: 1,
  duration: 18570.0,
  marker_string: "37.836805808795205,-122.2643952554725,37.83704614116397,-122.26313805959308"
)

Route.create!(
  name: "Morning run",
  description: "A little longer today.",
  length: 7523.0,
  polyline:
   "_qpeFlfijVkANA\\@HDj@JZHRJf@f@lD?LAh@E|@PtD\\nF?dABXSLFNNKDLJ\\\\v@@NGpACn@PhALjDD^L`@b@`AFVFb@Cx@KlA?jBHv@G?@`@DJHRDVB~AJzBDP^d@H\\BZFNPZJP?\\NnAI@UF?@l@vBh@|BFZPvADhBA`@A^CTN@L@Ed@SrCMrBEp@UhCAPH@ZJZL`@T\\\\Vl@PbADj@BnA?nABdALjAv@lFt@dFNr@\\`Aj@~@hBjCv@vAnA`C_@v@mBdE[z@Uv@WpAOtAE~@@rCFnAL|@Nn@Pb@h@z@VVVNXJb@HtAPt@Th@j@V`@JTj@pCxAzHZrBb@lD@FQf@KRc@Ji@VeCxAwAb@o@Ju@FyCNy@N{@X}FjCGBx@a@dAe@fDuAp@Sn@InDQlASp@St@[nAy@l@[d@QREBEXu@CQg@_Em@mD{A_IWaAc@w@SQ]Wu@Q}AS]IWMSOW[k@eAKa@Qw@IkAEyA@sBF_APyAVgARq@nAuCnAqCDIGGsAmC{@yAcBcCi@_A[eA{BeOKgAAeA?qACkAAYJCAIMq@ESYq@MOu@g@]O[KKA?CLsAH_AFeAJwAVsD]CF_A?e@Ak@K{AW{Am@eC_@mAAORGHAOsA?YFQVq@Da@Bq@E_@NAPA?IA]e@kH",
  elevation_gain: 146.048526763916,
  routeType: "run",
  user_id: 1,
  duration: 5652.0,
  marker_string: "37.7731176420072,-122.44092192494509,37.7713805623307,-122.45060362426761"
)

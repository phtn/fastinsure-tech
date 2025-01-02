platform "wasm"
    requires {} {}
    exposes []
    packages {}
    imports []
    provides [degToRad]

parseInt : Str -> Result F64 [InvalidNumber]
parseInt = \input ->
    input
    |> Str.toF64
    |> Result.mapErr \_ -> InvalidNumber

degToRad : Str -> Result F64 [InvalidNumber]
degToRad = \deg ->
    when parseInt deg is
        Ok value -> Ok ((value * Num.pi) / 180)
        Err err -> Err err

(module
  (import "ethereum" "storageStore" (func $storageStore (param i32 i32)))
  (memory 1)
  (data (i32.const 0)  "\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00") ;; Path
  (data (i32.const 32) "\cd\ab\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00") ;; Value
  (export "memory" (memory 0))
  (export "main" (func $main))
  (func $main
    (i64.store (i32.wrap_i64 (i64.const 64)) (i64.const 1))
  )
)

(module
  (import "ethereum" "finish" (func $finish (param i32 i32)))
  (memory 1)
  (data (i32.const 32) "\cd\ab\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00") ;; example contract bytecode
  (export "memory" (memory 0))
  (export "main" (func $main))
  (func $main
    (call $finish (i32.const 32) (i32.const 32))
  )
)

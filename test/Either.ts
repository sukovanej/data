import * as Either from "@effect/data/Either"
import { pipe } from "@effect/data/Function"
import * as N from "@effect/data/Number"
import * as O from "@effect/data/Option"
import * as S from "@effect/data/String"
import * as Util from "@effect/data/test/util"
import { inspect } from "node:util"

describe.concurrent("Either", () => {
  it("exports", () => {
    expect(Either.TypeId).exist
  })

  it("toString", () => {
    expect(String(Either.right(1))).toEqual("right(1)")
    expect(String(Either.left("e"))).toEqual(`left(e)`)
  })

  it("toJSON", () => {
    expect(JSON.stringify(Either.right(1))).toEqual(
      JSON.stringify({ _tag: "Right", right: 1 })
    )
    expect(JSON.stringify(Either.left("e"))).toEqual(
      JSON.stringify({ _tag: "Left", left: "e" })
    )
  })

  it("inspect", () => {
    expect(inspect(Either.right(1))).toEqual(inspect({ _tag: "Right", right: 1 }))
    expect(inspect(Either.left("e"))).toEqual(inspect({ _tag: "Left", left: "e" }))
  })

  it("isEither", () => {
    Util.deepStrictEqual(pipe(Either.right(1), Either.isEither), true)
    Util.deepStrictEqual(pipe(Either.left("e"), Either.isEither), true)
    Util.deepStrictEqual(pipe(O.some(1), Either.isEither), false)
  })

  it("getRight", () => {
    Util.deepStrictEqual(pipe(Either.right(1), Either.getRight), O.some(1))
    Util.deepStrictEqual(pipe(Either.left("a"), Either.getRight), O.none())
  })

  it("getLeft", () => {
    Util.deepStrictEqual(pipe(Either.right(1), Either.getLeft), O.none())
    Util.deepStrictEqual(pipe(Either.left("e"), Either.getLeft), O.some("e"))
  })

  it("mapRight", () => {
    const f = Either.mapRight(S.length)
    Util.deepStrictEqual(pipe(Either.right("abc"), f), Either.right(3))
    Util.deepStrictEqual(pipe(Either.left("s"), f), Either.left("s"))
  })

  it("mapBoth", () => {
    const f = Either.mapBoth({
      onLeft: S.length,
      onRight: (n: number) => n > 2
    })
    Util.deepStrictEqual(pipe(Either.right(1), f), Either.right(false))
    Util.deepStrictEqual(pipe(Either.left("a"), f), Either.left(1))
  })

  it("mapLeft", () => {
    const f = Either.mapLeft(Util.double)
    Util.deepStrictEqual(pipe(Either.right("a"), f), Either.right("a"))
    Util.deepStrictEqual(pipe(Either.left(1), f), Either.left(2))
  })

  it("match", () => {
    const onLeft = (s: string) => `left${s.length}`
    const onRight = (s: string) => `right${s.length}`
    const match = Either.match({ onLeft, onRight })
    Util.deepStrictEqual(match(Either.left("abc")), "left3")
    Util.deepStrictEqual(match(Either.right("abc")), "right3")
  })

  it("isLeft", () => {
    Util.deepStrictEqual(Either.isLeft(Either.right(1)), false)
    Util.deepStrictEqual(Either.isLeft(Either.left(1)), true)
  })

  it("isRight", () => {
    Util.deepStrictEqual(Either.isRight(Either.right(1)), true)
    Util.deepStrictEqual(Either.isRight(Either.left(1)), false)
  })

  it("swap", () => {
    Util.deepStrictEqual(Either.reverse(Either.right("a")), Either.left("a"))
    Util.deepStrictEqual(Either.reverse(Either.left("b")), Either.right("b"))
  })

  it("merge", () => {
    Util.deepStrictEqual(Either.merge(Either.right(1)), 1)
    Util.deepStrictEqual(Either.merge(Either.left("a")), "a")
  })

  it("getEquivalence", () => {
    const isEquivalent = Either.getEquivalence(S.Equivalence, N.Equivalence)
    Util.deepStrictEqual(isEquivalent(Either.right(1), Either.right(1)), true)
    Util.deepStrictEqual(isEquivalent(Either.right(1), Either.right(2)), false)
    Util.deepStrictEqual(isEquivalent(Either.right(1), Either.left("foo")), false)
    Util.deepStrictEqual(isEquivalent(Either.left("foo"), Either.left("foo")), true)
    Util.deepStrictEqual(isEquivalent(Either.left("foo"), Either.left("bar")), false)
    Util.deepStrictEqual(isEquivalent(Either.left("foo"), Either.right(1)), false)
  })

  it("pipe", () => {
    expect(Either.right(1).pipe(Either.mapRight((n) => n + 1))).toEqual(Either.right(2))
  })
})

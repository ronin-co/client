type Instructions =
  | {
      with?:
        | (
            | {
                [x: string]:
                  | (
                      | (string | number | boolean | null | any)
                      | {
                          being?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          notBeing?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          startingWith?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          endingWith?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          containing?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          greaterThan?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          lessThan?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                        }
                    )
                  | {
                      [x: string]:
                        | (string | number | boolean | null | any)
                        | {
                            being?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            notBeing?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            startingWith?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            endingWith?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            containing?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            greaterThan?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            lessThan?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                          };
                    }
                  | (
                      | (
                          | (string | number | boolean | null | any)
                          | {
                              being?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              notBeing?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              startingWith?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              endingWith?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              containing?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              greaterThan?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              lessThan?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                            }
                        )
                      | {
                          [x: string]:
                            | (string | number | boolean | null | any)
                            | {
                                being?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                notBeing?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                startingWith?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                endingWith?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                containing?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                greaterThan?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                lessThan?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                              };
                        }
                    )[]
                  | {
                      [x: string]: (
                        | (
                            | (string | number | boolean | null | any)
                            | {
                                being?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                notBeing?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                startingWith?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                endingWith?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                containing?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                greaterThan?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                lessThan?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                              }
                          )
                        | {
                            [x: string]:
                              | (string | number | boolean | null | any)
                              | {
                                  being?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  notBeing?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  startingWith?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  endingWith?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  containing?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  greaterThan?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  lessThan?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                };
                          }
                      )[];
                    };
              }
            | {
                [x: string]:
                  | (
                      | (string | number | boolean | null | any)
                      | {
                          being?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          notBeing?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          startingWith?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          endingWith?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          containing?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          greaterThan?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          lessThan?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                        }
                    )
                  | {
                      [x: string]:
                        | (string | number | boolean | null | any)
                        | {
                            being?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            notBeing?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            startingWith?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            endingWith?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            containing?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            greaterThan?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            lessThan?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                          };
                    }
                  | (
                      | (
                          | (string | number | boolean | null | any)
                          | {
                              being?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              notBeing?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              startingWith?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              endingWith?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              containing?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              greaterThan?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              lessThan?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                            }
                        )
                      | {
                          [x: string]:
                            | (string | number | boolean | null | any)
                            | {
                                being?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                notBeing?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                startingWith?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                endingWith?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                containing?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                greaterThan?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                lessThan?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                              };
                        }
                    )[]
                  | {
                      [x: string]: (
                        | (
                            | (string | number | boolean | null | any)
                            | {
                                being?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                notBeing?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                startingWith?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                endingWith?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                containing?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                greaterThan?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                lessThan?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                              }
                          )
                        | {
                            [x: string]:
                              | (string | number | boolean | null | any)
                              | {
                                  being?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  notBeing?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  startingWith?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  endingWith?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  containing?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  greaterThan?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  lessThan?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                };
                          }
                      )[];
                    };
              }[]
          )
        | undefined;
      to: {
        [x: string]: string | number | boolean | null | any;
      };
      including?: ('all' | string[]) | undefined;
      excluding?: string[] | undefined;
      orderedBy?:
        | (
            | {
                ascending?: string[] | undefined;
                descending?: string[] | undefined;
              }
            | undefined
          )
        | undefined;
      in?: string | undefined;
      before?: (string | null) | undefined;
      after?: (string | null) | undefined;
      limitedTo?: number | undefined;
    }
  | {
      with?:
        | (
            | {
                [x: string]:
                  | (
                      | (string | number | boolean | null | any)
                      | {
                          being?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          notBeing?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          startingWith?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          endingWith?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          containing?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          greaterThan?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          lessThan?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                        }
                    )
                  | {
                      [x: string]:
                        | (string | number | boolean | null | any)
                        | {
                            being?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            notBeing?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            startingWith?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            endingWith?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            containing?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            greaterThan?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            lessThan?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                          };
                    }
                  | (
                      | (
                          | (string | number | boolean | null | any)
                          | {
                              being?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              notBeing?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              startingWith?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              endingWith?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              containing?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              greaterThan?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              lessThan?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                            }
                        )
                      | {
                          [x: string]:
                            | (string | number | boolean | null | any)
                            | {
                                being?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                notBeing?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                startingWith?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                endingWith?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                containing?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                greaterThan?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                lessThan?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                              };
                        }
                    )[]
                  | {
                      [x: string]: (
                        | (
                            | (string | number | boolean | null | any)
                            | {
                                being?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                notBeing?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                startingWith?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                endingWith?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                containing?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                greaterThan?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                lessThan?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                              }
                          )
                        | {
                            [x: string]:
                              | (string | number | boolean | null | any)
                              | {
                                  being?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  notBeing?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  startingWith?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  endingWith?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  containing?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  greaterThan?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  lessThan?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                };
                          }
                      )[];
                    };
              }
            | {
                [x: string]:
                  | (
                      | (string | number | boolean | null | any)
                      | {
                          being?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          notBeing?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          startingWith?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          endingWith?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          containing?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          greaterThan?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          lessThan?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                        }
                    )
                  | {
                      [x: string]:
                        | (string | number | boolean | null | any)
                        | {
                            being?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            notBeing?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            startingWith?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            endingWith?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            containing?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            greaterThan?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            lessThan?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                          };
                    }
                  | (
                      | (
                          | (string | number | boolean | null | any)
                          | {
                              being?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              notBeing?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              startingWith?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              endingWith?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              containing?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              greaterThan?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              lessThan?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                            }
                        )
                      | {
                          [x: string]:
                            | (string | number | boolean | null | any)
                            | {
                                being?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                notBeing?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                startingWith?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                endingWith?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                containing?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                greaterThan?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                lessThan?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                              };
                        }
                    )[]
                  | {
                      [x: string]: (
                        | (
                            | (string | number | boolean | null | any)
                            | {
                                being?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                notBeing?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                startingWith?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                endingWith?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                containing?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                greaterThan?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                lessThan?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                              }
                          )
                        | {
                            [x: string]:
                              | (string | number | boolean | null | any)
                              | {
                                  being?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  notBeing?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  startingWith?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  endingWith?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  containing?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  greaterThan?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  lessThan?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                };
                          }
                      )[];
                    };
              }[]
          )
        | undefined;
      including?: ('all' | string[]) | undefined;
      excluding?: string[] | undefined;
      orderedBy?:
        | (
            | {
                ascending?: string[] | undefined;
                descending?: string[] | undefined;
              }
            | undefined
          )
        | undefined;
      in?: string | undefined;
      before?: (string | null) | undefined;
      after?: (string | null) | undefined;
      limitedTo?: number | undefined;
    }
  | {
      including?: ('all' | string[]) | undefined;
      excluding?: string[] | undefined;
      orderedBy?:
        | (
            | {
                ascending?: string[] | undefined;
                descending?: string[] | undefined;
              }
            | undefined
          )
        | undefined;
      in?: string | undefined;
      before?: (string | null) | undefined;
      after?: (string | null) | undefined;
      limitedTo?: number | undefined;
      with: {
        [x: string]:
          | (
              | (string | number | boolean | null | any)
              | {
                  being?:
                    | ((string | number | boolean | null | any) | (string | number | boolean | null | any)[])
                    | undefined;
                  notBeing?:
                    | ((string | number | boolean | null | any) | (string | number | boolean | null | any)[])
                    | undefined;
                  startingWith?:
                    | ((string | number | boolean | null | any) | (string | number | boolean | null | any)[])
                    | undefined;
                  endingWith?:
                    | ((string | number | boolean | null | any) | (string | number | boolean | null | any)[])
                    | undefined;
                  containing?:
                    | ((string | number | boolean | null | any) | (string | number | boolean | null | any)[])
                    | undefined;
                  greaterThan?:
                    | ((string | number | boolean | null | any) | (string | number | boolean | null | any)[])
                    | undefined;
                  lessThan?:
                    | ((string | number | boolean | null | any) | (string | number | boolean | null | any)[])
                    | undefined;
                }
            )
          | {
              [x: string]:
                | (string | number | boolean | null | any)
                | {
                    being?:
                      | (
                          | (string | number | boolean | null | any)
                          | (string | number | boolean | null | any)[]
                        )
                      | undefined;
                    notBeing?:
                      | (
                          | (string | number | boolean | null | any)
                          | (string | number | boolean | null | any)[]
                        )
                      | undefined;
                    startingWith?:
                      | (
                          | (string | number | boolean | null | any)
                          | (string | number | boolean | null | any)[]
                        )
                      | undefined;
                    endingWith?:
                      | (
                          | (string | number | boolean | null | any)
                          | (string | number | boolean | null | any)[]
                        )
                      | undefined;
                    containing?:
                      | (
                          | (string | number | boolean | null | any)
                          | (string | number | boolean | null | any)[]
                        )
                      | undefined;
                    greaterThan?:
                      | (
                          | (string | number | boolean | null | any)
                          | (string | number | boolean | null | any)[]
                        )
                      | undefined;
                    lessThan?:
                      | (
                          | (string | number | boolean | null | any)
                          | (string | number | boolean | null | any)[]
                        )
                      | undefined;
                  };
            }
          | (
              | (
                  | (string | number | boolean | null | any)
                  | {
                      being?:
                        | (
                            | (string | number | boolean | null | any)
                            | (string | number | boolean | null | any)[]
                          )
                        | undefined;
                      notBeing?:
                        | (
                            | (string | number | boolean | null | any)
                            | (string | number | boolean | null | any)[]
                          )
                        | undefined;
                      startingWith?:
                        | (
                            | (string | number | boolean | null | any)
                            | (string | number | boolean | null | any)[]
                          )
                        | undefined;
                      endingWith?:
                        | (
                            | (string | number | boolean | null | any)
                            | (string | number | boolean | null | any)[]
                          )
                        | undefined;
                      containing?:
                        | (
                            | (string | number | boolean | null | any)
                            | (string | number | boolean | null | any)[]
                          )
                        | undefined;
                      greaterThan?:
                        | (
                            | (string | number | boolean | null | any)
                            | (string | number | boolean | null | any)[]
                          )
                        | undefined;
                      lessThan?:
                        | (
                            | (string | number | boolean | null | any)
                            | (string | number | boolean | null | any)[]
                          )
                        | undefined;
                    }
                )
              | {
                  [x: string]:
                    | (string | number | boolean | null | any)
                    | {
                        being?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        notBeing?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        startingWith?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        endingWith?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        containing?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        greaterThan?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        lessThan?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                      };
                }
            )[]
          | {
              [x: string]: (
                | (
                    | (string | number | boolean | null | any)
                    | {
                        being?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        notBeing?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        startingWith?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        endingWith?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        containing?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        greaterThan?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        lessThan?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                      }
                  )
                | {
                    [x: string]:
                      | (string | number | boolean | null | any)
                      | {
                          being?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          notBeing?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          startingWith?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          endingWith?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          containing?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          greaterThan?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          lessThan?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                        };
                  }
              )[];
            };
      };
    }
  | {
      with?:
        | (
            | {
                [x: string]:
                  | (
                      | (string | number | boolean | null | any)
                      | {
                          being?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          notBeing?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          startingWith?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          endingWith?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          containing?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          greaterThan?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          lessThan?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                        }
                    )
                  | {
                      [x: string]:
                        | (string | number | boolean | null | any)
                        | {
                            being?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            notBeing?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            startingWith?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            endingWith?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            containing?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            greaterThan?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            lessThan?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                          };
                    }
                  | (
                      | (
                          | (string | number | boolean | null | any)
                          | {
                              being?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              notBeing?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              startingWith?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              endingWith?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              containing?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              greaterThan?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              lessThan?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                            }
                        )
                      | {
                          [x: string]:
                            | (string | number | boolean | null | any)
                            | {
                                being?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                notBeing?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                startingWith?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                endingWith?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                containing?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                greaterThan?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                lessThan?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                              };
                        }
                    )[]
                  | {
                      [x: string]: (
                        | (
                            | (string | number | boolean | null | any)
                            | {
                                being?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                notBeing?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                startingWith?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                endingWith?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                containing?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                greaterThan?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                lessThan?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                              }
                          )
                        | {
                            [x: string]:
                              | (string | number | boolean | null | any)
                              | {
                                  being?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  notBeing?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  startingWith?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  endingWith?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  containing?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  greaterThan?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  lessThan?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                };
                          }
                      )[];
                    };
              }
            | {
                [x: string]:
                  | (
                      | (string | number | boolean | null | any)
                      | {
                          being?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          notBeing?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          startingWith?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          endingWith?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          containing?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          greaterThan?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          lessThan?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                        }
                    )
                  | {
                      [x: string]:
                        | (string | number | boolean | null | any)
                        | {
                            being?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            notBeing?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            startingWith?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            endingWith?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            containing?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            greaterThan?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            lessThan?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                          };
                    }
                  | (
                      | (
                          | (string | number | boolean | null | any)
                          | {
                              being?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              notBeing?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              startingWith?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              endingWith?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              containing?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              greaterThan?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              lessThan?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                            }
                        )
                      | {
                          [x: string]:
                            | (string | number | boolean | null | any)
                            | {
                                being?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                notBeing?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                startingWith?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                endingWith?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                containing?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                greaterThan?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                lessThan?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                              };
                        }
                    )[]
                  | {
                      [x: string]: (
                        | (
                            | (string | number | boolean | null | any)
                            | {
                                being?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                notBeing?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                startingWith?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                endingWith?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                containing?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                greaterThan?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                lessThan?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                              }
                          )
                        | {
                            [x: string]:
                              | (string | number | boolean | null | any)
                              | {
                                  being?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  notBeing?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  startingWith?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  endingWith?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  containing?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  greaterThan?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  lessThan?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                };
                          }
                      )[];
                    };
              }[]
          )
        | undefined;
      including?: ('all' | string[]) | undefined;
      excluding?: string[] | undefined;
      orderedBy?:
        | (
            | {
                ascending?: string[] | undefined;
                descending?: string[] | undefined;
              }
            | undefined
          )
        | undefined;
      in?: string | undefined;
      before?: (string | null) | undefined;
      after?: (string | null) | undefined;
      limitedTo?: number | undefined;
    }
  | {
      with?:
        | (
            | {
                [x: string]:
                  | (
                      | (string | number | boolean | null | any)
                      | {
                          being?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          notBeing?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          startingWith?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          endingWith?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          containing?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          greaterThan?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          lessThan?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                        }
                    )
                  | {
                      [x: string]:
                        | (string | number | boolean | null | any)
                        | {
                            being?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            notBeing?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            startingWith?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            endingWith?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            containing?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            greaterThan?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            lessThan?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                          };
                    }
                  | (
                      | (
                          | (string | number | boolean | null | any)
                          | {
                              being?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              notBeing?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              startingWith?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              endingWith?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              containing?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              greaterThan?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              lessThan?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                            }
                        )
                      | {
                          [x: string]:
                            | (string | number | boolean | null | any)
                            | {
                                being?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                notBeing?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                startingWith?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                endingWith?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                containing?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                greaterThan?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                lessThan?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                              };
                        }
                    )[]
                  | {
                      [x: string]: (
                        | (
                            | (string | number | boolean | null | any)
                            | {
                                being?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                notBeing?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                startingWith?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                endingWith?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                containing?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                greaterThan?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                lessThan?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                              }
                          )
                        | {
                            [x: string]:
                              | (string | number | boolean | null | any)
                              | {
                                  being?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  notBeing?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  startingWith?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  endingWith?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  containing?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  greaterThan?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  lessThan?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                };
                          }
                      )[];
                    };
              }
            | {
                [x: string]:
                  | (
                      | (string | number | boolean | null | any)
                      | {
                          being?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          notBeing?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          startingWith?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          endingWith?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          containing?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          greaterThan?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          lessThan?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                        }
                    )
                  | {
                      [x: string]:
                        | (string | number | boolean | null | any)
                        | {
                            being?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            notBeing?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            startingWith?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            endingWith?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            containing?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            greaterThan?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            lessThan?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                          };
                    }
                  | (
                      | (
                          | (string | number | boolean | null | any)
                          | {
                              being?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              notBeing?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              startingWith?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              endingWith?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              containing?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              greaterThan?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              lessThan?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                            }
                        )
                      | {
                          [x: string]:
                            | (string | number | boolean | null | any)
                            | {
                                being?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                notBeing?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                startingWith?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                endingWith?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                containing?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                greaterThan?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                lessThan?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                              };
                        }
                    )[]
                  | {
                      [x: string]: (
                        | (
                            | (string | number | boolean | null | any)
                            | {
                                being?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                notBeing?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                startingWith?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                endingWith?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                containing?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                greaterThan?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                lessThan?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                              }
                          )
                        | {
                            [x: string]:
                              | (string | number | boolean | null | any)
                              | {
                                  being?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  notBeing?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  startingWith?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  endingWith?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  containing?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  greaterThan?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  lessThan?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                };
                          }
                      )[];
                    };
              }[]
          )
        | undefined;
      including?: ('all' | string[]) | undefined;
      excluding?: string[] | undefined;
      orderedBy?:
        | (
            | {
                ascending?: string[] | undefined;
                descending?: string[] | undefined;
              }
            | undefined
          )
        | undefined;
      in?: string | undefined;
      before?: (string | null) | undefined;
      after?: (string | null) | undefined;
      limitedTo?: number | undefined;
    };

type QueryInstructionType = {
  with:
    | {
        [x: string]:
          | (
              | (string | number | boolean | null | any)
              | {
                  being?:
                    | ((string | number | boolean | null | any) | (string | number | boolean | null | any)[])
                    | undefined;
                  notBeing?:
                    | ((string | number | boolean | null | any) | (string | number | boolean | null | any)[])
                    | undefined;
                  startingWith?:
                    | ((string | number | boolean | null | any) | (string | number | boolean | null | any)[])
                    | undefined;
                  endingWith?:
                    | ((string | number | boolean | null | any) | (string | number | boolean | null | any)[])
                    | undefined;
                  containing?:
                    | ((string | number | boolean | null | any) | (string | number | boolean | null | any)[])
                    | undefined;
                  greaterThan?:
                    | ((string | number | boolean | null | any) | (string | number | boolean | null | any)[])
                    | undefined;
                  lessThan?:
                    | ((string | number | boolean | null | any) | (string | number | boolean | null | any)[])
                    | undefined;
                }
            )
          | {
              [x: string]:
                | (string | number | boolean | null | any)
                | {
                    being?:
                      | (
                          | (string | number | boolean | null | any)
                          | (string | number | boolean | null | any)[]
                        )
                      | undefined;
                    notBeing?:
                      | (
                          | (string | number | boolean | null | any)
                          | (string | number | boolean | null | any)[]
                        )
                      | undefined;
                    startingWith?:
                      | (
                          | (string | number | boolean | null | any)
                          | (string | number | boolean | null | any)[]
                        )
                      | undefined;
                    endingWith?:
                      | (
                          | (string | number | boolean | null | any)
                          | (string | number | boolean | null | any)[]
                        )
                      | undefined;
                    containing?:
                      | (
                          | (string | number | boolean | null | any)
                          | (string | number | boolean | null | any)[]
                        )
                      | undefined;
                    greaterThan?:
                      | (
                          | (string | number | boolean | null | any)
                          | (string | number | boolean | null | any)[]
                        )
                      | undefined;
                    lessThan?:
                      | (
                          | (string | number | boolean | null | any)
                          | (string | number | boolean | null | any)[]
                        )
                      | undefined;
                  };
            }
          | (
              | (
                  | (string | number | boolean | null | any)
                  | {
                      being?:
                        | (
                            | (string | number | boolean | null | any)
                            | (string | number | boolean | null | any)[]
                          )
                        | undefined;
                      notBeing?:
                        | (
                            | (string | number | boolean | null | any)
                            | (string | number | boolean | null | any)[]
                          )
                        | undefined;
                      startingWith?:
                        | (
                            | (string | number | boolean | null | any)
                            | (string | number | boolean | null | any)[]
                          )
                        | undefined;
                      endingWith?:
                        | (
                            | (string | number | boolean | null | any)
                            | (string | number | boolean | null | any)[]
                          )
                        | undefined;
                      containing?:
                        | (
                            | (string | number | boolean | null | any)
                            | (string | number | boolean | null | any)[]
                          )
                        | undefined;
                      greaterThan?:
                        | (
                            | (string | number | boolean | null | any)
                            | (string | number | boolean | null | any)[]
                          )
                        | undefined;
                      lessThan?:
                        | (
                            | (string | number | boolean | null | any)
                            | (string | number | boolean | null | any)[]
                          )
                        | undefined;
                    }
                )
              | {
                  [x: string]:
                    | (string | number | boolean | null | any)
                    | {
                        being?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        notBeing?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        startingWith?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        endingWith?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        containing?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        greaterThan?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        lessThan?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                      };
                }
            )[]
          | {
              [x: string]: (
                | (
                    | (string | number | boolean | null | any)
                    | {
                        being?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        notBeing?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        startingWith?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        endingWith?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        containing?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        greaterThan?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        lessThan?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                      }
                  )
                | {
                    [x: string]:
                      | (string | number | boolean | null | any)
                      | {
                          being?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          notBeing?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          startingWith?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          endingWith?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          containing?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          greaterThan?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          lessThan?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                        };
                  }
              )[];
            };
      }
    | {
        [x: string]:
          | (
              | (string | number | boolean | null | any)
              | {
                  being?:
                    | ((string | number | boolean | null | any) | (string | number | boolean | null | any)[])
                    | undefined;
                  notBeing?:
                    | ((string | number | boolean | null | any) | (string | number | boolean | null | any)[])
                    | undefined;
                  startingWith?:
                    | ((string | number | boolean | null | any) | (string | number | boolean | null | any)[])
                    | undefined;
                  endingWith?:
                    | ((string | number | boolean | null | any) | (string | number | boolean | null | any)[])
                    | undefined;
                  containing?:
                    | ((string | number | boolean | null | any) | (string | number | boolean | null | any)[])
                    | undefined;
                  greaterThan?:
                    | ((string | number | boolean | null | any) | (string | number | boolean | null | any)[])
                    | undefined;
                  lessThan?:
                    | ((string | number | boolean | null | any) | (string | number | boolean | null | any)[])
                    | undefined;
                }
            )
          | {
              [x: string]:
                | (string | number | boolean | null | any)
                | {
                    being?:
                      | (
                          | (string | number | boolean | null | any)
                          | (string | number | boolean | null | any)[]
                        )
                      | undefined;
                    notBeing?:
                      | (
                          | (string | number | boolean | null | any)
                          | (string | number | boolean | null | any)[]
                        )
                      | undefined;
                    startingWith?:
                      | (
                          | (string | number | boolean | null | any)
                          | (string | number | boolean | null | any)[]
                        )
                      | undefined;
                    endingWith?:
                      | (
                          | (string | number | boolean | null | any)
                          | (string | number | boolean | null | any)[]
                        )
                      | undefined;
                    containing?:
                      | (
                          | (string | number | boolean | null | any)
                          | (string | number | boolean | null | any)[]
                        )
                      | undefined;
                    greaterThan?:
                      | (
                          | (string | number | boolean | null | any)
                          | (string | number | boolean | null | any)[]
                        )
                      | undefined;
                    lessThan?:
                      | (
                          | (string | number | boolean | null | any)
                          | (string | number | boolean | null | any)[]
                        )
                      | undefined;
                  };
            }
          | (
              | (
                  | (string | number | boolean | null | any)
                  | {
                      being?:
                        | (
                            | (string | number | boolean | null | any)
                            | (string | number | boolean | null | any)[]
                          )
                        | undefined;
                      notBeing?:
                        | (
                            | (string | number | boolean | null | any)
                            | (string | number | boolean | null | any)[]
                          )
                        | undefined;
                      startingWith?:
                        | (
                            | (string | number | boolean | null | any)
                            | (string | number | boolean | null | any)[]
                          )
                        | undefined;
                      endingWith?:
                        | (
                            | (string | number | boolean | null | any)
                            | (string | number | boolean | null | any)[]
                          )
                        | undefined;
                      containing?:
                        | (
                            | (string | number | boolean | null | any)
                            | (string | number | boolean | null | any)[]
                          )
                        | undefined;
                      greaterThan?:
                        | (
                            | (string | number | boolean | null | any)
                            | (string | number | boolean | null | any)[]
                          )
                        | undefined;
                      lessThan?:
                        | (
                            | (string | number | boolean | null | any)
                            | (string | number | boolean | null | any)[]
                          )
                        | undefined;
                    }
                )
              | {
                  [x: string]:
                    | (string | number | boolean | null | any)
                    | {
                        being?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        notBeing?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        startingWith?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        endingWith?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        containing?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        greaterThan?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        lessThan?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                      };
                }
            )[]
          | {
              [x: string]: (
                | (
                    | (string | number | boolean | null | any)
                    | {
                        being?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        notBeing?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        startingWith?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        endingWith?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        containing?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        greaterThan?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        lessThan?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                      }
                  )
                | {
                    [x: string]:
                      | (string | number | boolean | null | any)
                      | {
                          being?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          notBeing?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          startingWith?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          endingWith?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          containing?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          greaterThan?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          lessThan?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                        };
                  }
              )[];
            };
      }[];
  to: {
    [x: string]: string | number | boolean | null | any;
  };
  including: 'all' | string[];
  excluding: string[];
  orderedBy?:
    | {
        ascending?: string[] | undefined;
        descending?: string[] | undefined;
      }
    | undefined;
  in: string;
  before: string | null;
  after: string | null;
  limitedTo: number;
};

type CountInstructions = {
  with?:
    | (
        | {
            [x: string]:
              | (
                  | (string | number | boolean | null | any)
                  | {
                      being?:
                        | (
                            | (string | number | boolean | null | any)
                            | (string | number | boolean | null | any)[]
                          )
                        | undefined;
                      notBeing?:
                        | (
                            | (string | number | boolean | null | any)
                            | (string | number | boolean | null | any)[]
                          )
                        | undefined;
                      startingWith?:
                        | (
                            | (string | number | boolean | null | any)
                            | (string | number | boolean | null | any)[]
                          )
                        | undefined;
                      endingWith?:
                        | (
                            | (string | number | boolean | null | any)
                            | (string | number | boolean | null | any)[]
                          )
                        | undefined;
                      containing?:
                        | (
                            | (string | number | boolean | null | any)
                            | (string | number | boolean | null | any)[]
                          )
                        | undefined;
                      greaterThan?:
                        | (
                            | (string | number | boolean | null | any)
                            | (string | number | boolean | null | any)[]
                          )
                        | undefined;
                      lessThan?:
                        | (
                            | (string | number | boolean | null | any)
                            | (string | number | boolean | null | any)[]
                          )
                        | undefined;
                    }
                )
              | {
                  [x: string]:
                    | (string | number | boolean | null | any)
                    | {
                        being?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        notBeing?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        startingWith?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        endingWith?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        containing?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        greaterThan?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        lessThan?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                      };
                }
              | (
                  | (
                      | (string | number | boolean | null | any)
                      | {
                          being?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          notBeing?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          startingWith?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          endingWith?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          containing?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          greaterThan?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          lessThan?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                        }
                    )
                  | {
                      [x: string]:
                        | (string | number | boolean | null | any)
                        | {
                            being?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            notBeing?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            startingWith?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            endingWith?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            containing?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            greaterThan?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            lessThan?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                          };
                    }
                )[]
              | {
                  [x: string]: (
                    | (
                        | (string | number | boolean | null | any)
                        | {
                            being?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            notBeing?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            startingWith?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            endingWith?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            containing?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            greaterThan?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            lessThan?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                          }
                      )
                    | {
                        [x: string]:
                          | (string | number | boolean | null | any)
                          | {
                              being?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              notBeing?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              startingWith?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              endingWith?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              containing?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              greaterThan?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              lessThan?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                            };
                      }
                  )[];
                };
          }
        | {
            [x: string]:
              | (
                  | (string | number | boolean | null | any)
                  | {
                      being?:
                        | (
                            | (string | number | boolean | null | any)
                            | (string | number | boolean | null | any)[]
                          )
                        | undefined;
                      notBeing?:
                        | (
                            | (string | number | boolean | null | any)
                            | (string | number | boolean | null | any)[]
                          )
                        | undefined;
                      startingWith?:
                        | (
                            | (string | number | boolean | null | any)
                            | (string | number | boolean | null | any)[]
                          )
                        | undefined;
                      endingWith?:
                        | (
                            | (string | number | boolean | null | any)
                            | (string | number | boolean | null | any)[]
                          )
                        | undefined;
                      containing?:
                        | (
                            | (string | number | boolean | null | any)
                            | (string | number | boolean | null | any)[]
                          )
                        | undefined;
                      greaterThan?:
                        | (
                            | (string | number | boolean | null | any)
                            | (string | number | boolean | null | any)[]
                          )
                        | undefined;
                      lessThan?:
                        | (
                            | (string | number | boolean | null | any)
                            | (string | number | boolean | null | any)[]
                          )
                        | undefined;
                    }
                )
              | {
                  [x: string]:
                    | (string | number | boolean | null | any)
                    | {
                        being?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        notBeing?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        startingWith?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        endingWith?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        containing?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        greaterThan?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        lessThan?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                      };
                }
              | (
                  | (
                      | (string | number | boolean | null | any)
                      | {
                          being?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          notBeing?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          startingWith?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          endingWith?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          containing?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          greaterThan?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          lessThan?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                        }
                    )
                  | {
                      [x: string]:
                        | (string | number | boolean | null | any)
                        | {
                            being?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            notBeing?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            startingWith?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            endingWith?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            containing?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            greaterThan?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            lessThan?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                          };
                    }
                )[]
              | {
                  [x: string]: (
                    | (
                        | (string | number | boolean | null | any)
                        | {
                            being?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            notBeing?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            startingWith?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            endingWith?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            containing?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            greaterThan?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            lessThan?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                          }
                      )
                    | {
                        [x: string]:
                          | (string | number | boolean | null | any)
                          | {
                              being?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              notBeing?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              startingWith?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              endingWith?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              containing?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              greaterThan?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              lessThan?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                            };
                      }
                  )[];
                };
          }[]
      )
    | undefined;
  including?: ('all' | string[]) | undefined;
  excluding?: string[] | undefined;
  orderedBy?:
    | (
        | {
            ascending?: string[] | undefined;
            descending?: string[] | undefined;
          }
        | undefined
      )
    | undefined;
  in?: string | undefined;
  before?: (string | null) | undefined;
  after?: (string | null) | undefined;
  limitedTo?: number | undefined;
};

type CountQuery = {
  count: {
    [x: string]: {
      with?:
        | (
            | {
                [x: string]:
                  | (
                      | (string | number | boolean | null | any)
                      | {
                          being?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          notBeing?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          startingWith?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          endingWith?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          containing?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          greaterThan?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          lessThan?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                        }
                    )
                  | {
                      [x: string]:
                        | (string | number | boolean | null | any)
                        | {
                            being?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            notBeing?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            startingWith?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            endingWith?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            containing?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            greaterThan?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            lessThan?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                          };
                    }
                  | (
                      | (
                          | (string | number | boolean | null | any)
                          | {
                              being?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              notBeing?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              startingWith?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              endingWith?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              containing?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              greaterThan?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              lessThan?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                            }
                        )
                      | {
                          [x: string]:
                            | (string | number | boolean | null | any)
                            | {
                                being?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                notBeing?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                startingWith?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                endingWith?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                containing?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                greaterThan?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                lessThan?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                              };
                        }
                    )[]
                  | {
                      [x: string]: (
                        | (
                            | (string | number | boolean | null | any)
                            | {
                                being?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                notBeing?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                startingWith?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                endingWith?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                containing?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                greaterThan?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                lessThan?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                              }
                          )
                        | {
                            [x: string]:
                              | (string | number | boolean | null | any)
                              | {
                                  being?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  notBeing?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  startingWith?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  endingWith?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  containing?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  greaterThan?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  lessThan?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                };
                          }
                      )[];
                    };
              }
            | {
                [x: string]:
                  | (
                      | (string | number | boolean | null | any)
                      | {
                          being?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          notBeing?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          startingWith?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          endingWith?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          containing?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          greaterThan?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          lessThan?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                        }
                    )
                  | {
                      [x: string]:
                        | (string | number | boolean | null | any)
                        | {
                            being?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            notBeing?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            startingWith?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            endingWith?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            containing?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            greaterThan?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            lessThan?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                          };
                    }
                  | (
                      | (
                          | (string | number | boolean | null | any)
                          | {
                              being?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              notBeing?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              startingWith?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              endingWith?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              containing?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              greaterThan?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              lessThan?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                            }
                        )
                      | {
                          [x: string]:
                            | (string | number | boolean | null | any)
                            | {
                                being?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                notBeing?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                startingWith?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                endingWith?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                containing?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                greaterThan?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                lessThan?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                              };
                        }
                    )[]
                  | {
                      [x: string]: (
                        | (
                            | (string | number | boolean | null | any)
                            | {
                                being?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                notBeing?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                startingWith?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                endingWith?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                containing?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                greaterThan?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                lessThan?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                              }
                          )
                        | {
                            [x: string]:
                              | (string | number | boolean | null | any)
                              | {
                                  being?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  notBeing?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  startingWith?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  endingWith?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  containing?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  greaterThan?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  lessThan?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                };
                          }
                      )[];
                    };
              }[]
          )
        | undefined;
      including?: ('all' | string[]) | undefined;
      excluding?: string[] | undefined;
      orderedBy?:
        | (
            | {
                ascending?: string[] | undefined;
                descending?: string[] | undefined;
              }
            | undefined
          )
        | undefined;
      in?: string | undefined;
      before?: (string | null) | undefined;
      after?: (string | null) | undefined;
      limitedTo?: number | undefined;
    } | null;
  };
};

type CreateInstructions = {
  including?: ('all' | string[]) | undefined;
  excluding?: string[] | undefined;
  orderedBy?:
    | (
        | {
            ascending?: string[] | undefined;
            descending?: string[] | undefined;
          }
        | undefined
      )
    | undefined;
  in?: string | undefined;
  before?: (string | null) | undefined;
  after?: (string | null) | undefined;
  limitedTo?: number | undefined;
  with: {
    [x: string]:
      | (
          | (string | number | boolean | null | any)
          | {
              being?:
                | ((string | number | boolean | null | any) | (string | number | boolean | null | any)[])
                | undefined;
              notBeing?:
                | ((string | number | boolean | null | any) | (string | number | boolean | null | any)[])
                | undefined;
              startingWith?:
                | ((string | number | boolean | null | any) | (string | number | boolean | null | any)[])
                | undefined;
              endingWith?:
                | ((string | number | boolean | null | any) | (string | number | boolean | null | any)[])
                | undefined;
              containing?:
                | ((string | number | boolean | null | any) | (string | number | boolean | null | any)[])
                | undefined;
              greaterThan?:
                | ((string | number | boolean | null | any) | (string | number | boolean | null | any)[])
                | undefined;
              lessThan?:
                | ((string | number | boolean | null | any) | (string | number | boolean | null | any)[])
                | undefined;
            }
        )
      | {
          [x: string]:
            | (string | number | boolean | null | any)
            | {
                being?:
                  | ((string | number | boolean | null | any) | (string | number | boolean | null | any)[])
                  | undefined;
                notBeing?:
                  | ((string | number | boolean | null | any) | (string | number | boolean | null | any)[])
                  | undefined;
                startingWith?:
                  | ((string | number | boolean | null | any) | (string | number | boolean | null | any)[])
                  | undefined;
                endingWith?:
                  | ((string | number | boolean | null | any) | (string | number | boolean | null | any)[])
                  | undefined;
                containing?:
                  | ((string | number | boolean | null | any) | (string | number | boolean | null | any)[])
                  | undefined;
                greaterThan?:
                  | ((string | number | boolean | null | any) | (string | number | boolean | null | any)[])
                  | undefined;
                lessThan?:
                  | ((string | number | boolean | null | any) | (string | number | boolean | null | any)[])
                  | undefined;
              };
        }
      | (
          | (
              | (string | number | boolean | null | any)
              | {
                  being?:
                    | ((string | number | boolean | null | any) | (string | number | boolean | null | any)[])
                    | undefined;
                  notBeing?:
                    | ((string | number | boolean | null | any) | (string | number | boolean | null | any)[])
                    | undefined;
                  startingWith?:
                    | ((string | number | boolean | null | any) | (string | number | boolean | null | any)[])
                    | undefined;
                  endingWith?:
                    | ((string | number | boolean | null | any) | (string | number | boolean | null | any)[])
                    | undefined;
                  containing?:
                    | ((string | number | boolean | null | any) | (string | number | boolean | null | any)[])
                    | undefined;
                  greaterThan?:
                    | ((string | number | boolean | null | any) | (string | number | boolean | null | any)[])
                    | undefined;
                  lessThan?:
                    | ((string | number | boolean | null | any) | (string | number | boolean | null | any)[])
                    | undefined;
                }
            )
          | {
              [x: string]:
                | (string | number | boolean | null | any)
                | {
                    being?:
                      | (
                          | (string | number | boolean | null | any)
                          | (string | number | boolean | null | any)[]
                        )
                      | undefined;
                    notBeing?:
                      | (
                          | (string | number | boolean | null | any)
                          | (string | number | boolean | null | any)[]
                        )
                      | undefined;
                    startingWith?:
                      | (
                          | (string | number | boolean | null | any)
                          | (string | number | boolean | null | any)[]
                        )
                      | undefined;
                    endingWith?:
                      | (
                          | (string | number | boolean | null | any)
                          | (string | number | boolean | null | any)[]
                        )
                      | undefined;
                    containing?:
                      | (
                          | (string | number | boolean | null | any)
                          | (string | number | boolean | null | any)[]
                        )
                      | undefined;
                    greaterThan?:
                      | (
                          | (string | number | boolean | null | any)
                          | (string | number | boolean | null | any)[]
                        )
                      | undefined;
                    lessThan?:
                      | (
                          | (string | number | boolean | null | any)
                          | (string | number | boolean | null | any)[]
                        )
                      | undefined;
                  };
            }
        )[]
      | {
          [x: string]: (
            | (
                | (string | number | boolean | null | any)
                | {
                    being?:
                      | (
                          | (string | number | boolean | null | any)
                          | (string | number | boolean | null | any)[]
                        )
                      | undefined;
                    notBeing?:
                      | (
                          | (string | number | boolean | null | any)
                          | (string | number | boolean | null | any)[]
                        )
                      | undefined;
                    startingWith?:
                      | (
                          | (string | number | boolean | null | any)
                          | (string | number | boolean | null | any)[]
                        )
                      | undefined;
                    endingWith?:
                      | (
                          | (string | number | boolean | null | any)
                          | (string | number | boolean | null | any)[]
                        )
                      | undefined;
                    containing?:
                      | (
                          | (string | number | boolean | null | any)
                          | (string | number | boolean | null | any)[]
                        )
                      | undefined;
                    greaterThan?:
                      | (
                          | (string | number | boolean | null | any)
                          | (string | number | boolean | null | any)[]
                        )
                      | undefined;
                    lessThan?:
                      | (
                          | (string | number | boolean | null | any)
                          | (string | number | boolean | null | any)[]
                        )
                      | undefined;
                  }
              )
            | {
                [x: string]:
                  | (string | number | boolean | null | any)
                  | {
                      being?:
                        | (
                            | (string | number | boolean | null | any)
                            | (string | number | boolean | null | any)[]
                          )
                        | undefined;
                      notBeing?:
                        | (
                            | (string | number | boolean | null | any)
                            | (string | number | boolean | null | any)[]
                          )
                        | undefined;
                      startingWith?:
                        | (
                            | (string | number | boolean | null | any)
                            | (string | number | boolean | null | any)[]
                          )
                        | undefined;
                      endingWith?:
                        | (
                            | (string | number | boolean | null | any)
                            | (string | number | boolean | null | any)[]
                          )
                        | undefined;
                      containing?:
                        | (
                            | (string | number | boolean | null | any)
                            | (string | number | boolean | null | any)[]
                          )
                        | undefined;
                      greaterThan?:
                        | (
                            | (string | number | boolean | null | any)
                            | (string | number | boolean | null | any)[]
                          )
                        | undefined;
                      lessThan?:
                        | (
                            | (string | number | boolean | null | any)
                            | (string | number | boolean | null | any)[]
                          )
                        | undefined;
                    };
              }
          )[];
        };
  };
};

type CreateQuery = {
  create: {
    [x: string]: {
      including?: ('all' | string[]) | undefined;
      excluding?: string[] | undefined;
      orderedBy?:
        | (
            | {
                ascending?: string[] | undefined;
                descending?: string[] | undefined;
              }
            | undefined
          )
        | undefined;
      in?: string | undefined;
      before?: (string | null) | undefined;
      after?: (string | null) | undefined;
      limitedTo?: number | undefined;
      with: {
        [x: string]:
          | (
              | (string | number | boolean | null | any)
              | {
                  being?:
                    | ((string | number | boolean | null | any) | (string | number | boolean | null | any)[])
                    | undefined;
                  notBeing?:
                    | ((string | number | boolean | null | any) | (string | number | boolean | null | any)[])
                    | undefined;
                  startingWith?:
                    | ((string | number | boolean | null | any) | (string | number | boolean | null | any)[])
                    | undefined;
                  endingWith?:
                    | ((string | number | boolean | null | any) | (string | number | boolean | null | any)[])
                    | undefined;
                  containing?:
                    | ((string | number | boolean | null | any) | (string | number | boolean | null | any)[])
                    | undefined;
                  greaterThan?:
                    | ((string | number | boolean | null | any) | (string | number | boolean | null | any)[])
                    | undefined;
                  lessThan?:
                    | ((string | number | boolean | null | any) | (string | number | boolean | null | any)[])
                    | undefined;
                }
            )
          | {
              [x: string]:
                | (string | number | boolean | null | any)
                | {
                    being?:
                      | (
                          | (string | number | boolean | null | any)
                          | (string | number | boolean | null | any)[]
                        )
                      | undefined;
                    notBeing?:
                      | (
                          | (string | number | boolean | null | any)
                          | (string | number | boolean | null | any)[]
                        )
                      | undefined;
                    startingWith?:
                      | (
                          | (string | number | boolean | null | any)
                          | (string | number | boolean | null | any)[]
                        )
                      | undefined;
                    endingWith?:
                      | (
                          | (string | number | boolean | null | any)
                          | (string | number | boolean | null | any)[]
                        )
                      | undefined;
                    containing?:
                      | (
                          | (string | number | boolean | null | any)
                          | (string | number | boolean | null | any)[]
                        )
                      | undefined;
                    greaterThan?:
                      | (
                          | (string | number | boolean | null | any)
                          | (string | number | boolean | null | any)[]
                        )
                      | undefined;
                    lessThan?:
                      | (
                          | (string | number | boolean | null | any)
                          | (string | number | boolean | null | any)[]
                        )
                      | undefined;
                  };
            }
          | (
              | (
                  | (string | number | boolean | null | any)
                  | {
                      being?:
                        | (
                            | (string | number | boolean | null | any)
                            | (string | number | boolean | null | any)[]
                          )
                        | undefined;
                      notBeing?:
                        | (
                            | (string | number | boolean | null | any)
                            | (string | number | boolean | null | any)[]
                          )
                        | undefined;
                      startingWith?:
                        | (
                            | (string | number | boolean | null | any)
                            | (string | number | boolean | null | any)[]
                          )
                        | undefined;
                      endingWith?:
                        | (
                            | (string | number | boolean | null | any)
                            | (string | number | boolean | null | any)[]
                          )
                        | undefined;
                      containing?:
                        | (
                            | (string | number | boolean | null | any)
                            | (string | number | boolean | null | any)[]
                          )
                        | undefined;
                      greaterThan?:
                        | (
                            | (string | number | boolean | null | any)
                            | (string | number | boolean | null | any)[]
                          )
                        | undefined;
                      lessThan?:
                        | (
                            | (string | number | boolean | null | any)
                            | (string | number | boolean | null | any)[]
                          )
                        | undefined;
                    }
                )
              | {
                  [x: string]:
                    | (string | number | boolean | null | any)
                    | {
                        being?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        notBeing?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        startingWith?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        endingWith?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        containing?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        greaterThan?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        lessThan?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                      };
                }
            )[]
          | {
              [x: string]: (
                | (
                    | (string | number | boolean | null | any)
                    | {
                        being?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        notBeing?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        startingWith?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        endingWith?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        containing?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        greaterThan?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        lessThan?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                      }
                  )
                | {
                    [x: string]:
                      | (string | number | boolean | null | any)
                      | {
                          being?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          notBeing?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          startingWith?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          endingWith?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          containing?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          greaterThan?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          lessThan?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                        };
                  }
              )[];
            };
      };
    };
  };
};

type DropInstructions = {
  with?:
    | (
        | {
            [x: string]:
              | (
                  | (string | number | boolean | null | any)
                  | {
                      being?:
                        | (
                            | (string | number | boolean | null | any)
                            | (string | number | boolean | null | any)[]
                          )
                        | undefined;
                      notBeing?:
                        | (
                            | (string | number | boolean | null | any)
                            | (string | number | boolean | null | any)[]
                          )
                        | undefined;
                      startingWith?:
                        | (
                            | (string | number | boolean | null | any)
                            | (string | number | boolean | null | any)[]
                          )
                        | undefined;
                      endingWith?:
                        | (
                            | (string | number | boolean | null | any)
                            | (string | number | boolean | null | any)[]
                          )
                        | undefined;
                      containing?:
                        | (
                            | (string | number | boolean | null | any)
                            | (string | number | boolean | null | any)[]
                          )
                        | undefined;
                      greaterThan?:
                        | (
                            | (string | number | boolean | null | any)
                            | (string | number | boolean | null | any)[]
                          )
                        | undefined;
                      lessThan?:
                        | (
                            | (string | number | boolean | null | any)
                            | (string | number | boolean | null | any)[]
                          )
                        | undefined;
                    }
                )
              | {
                  [x: string]:
                    | (string | number | boolean | null | any)
                    | {
                        being?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        notBeing?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        startingWith?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        endingWith?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        containing?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        greaterThan?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        lessThan?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                      };
                }
              | (
                  | (
                      | (string | number | boolean | null | any)
                      | {
                          being?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          notBeing?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          startingWith?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          endingWith?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          containing?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          greaterThan?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          lessThan?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                        }
                    )
                  | {
                      [x: string]:
                        | (string | number | boolean | null | any)
                        | {
                            being?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            notBeing?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            startingWith?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            endingWith?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            containing?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            greaterThan?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            lessThan?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                          };
                    }
                )[]
              | {
                  [x: string]: (
                    | (
                        | (string | number | boolean | null | any)
                        | {
                            being?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            notBeing?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            startingWith?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            endingWith?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            containing?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            greaterThan?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            lessThan?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                          }
                      )
                    | {
                        [x: string]:
                          | (string | number | boolean | null | any)
                          | {
                              being?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              notBeing?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              startingWith?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              endingWith?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              containing?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              greaterThan?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              lessThan?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                            };
                      }
                  )[];
                };
          }
        | {
            [x: string]:
              | (
                  | (string | number | boolean | null | any)
                  | {
                      being?:
                        | (
                            | (string | number | boolean | null | any)
                            | (string | number | boolean | null | any)[]
                          )
                        | undefined;
                      notBeing?:
                        | (
                            | (string | number | boolean | null | any)
                            | (string | number | boolean | null | any)[]
                          )
                        | undefined;
                      startingWith?:
                        | (
                            | (string | number | boolean | null | any)
                            | (string | number | boolean | null | any)[]
                          )
                        | undefined;
                      endingWith?:
                        | (
                            | (string | number | boolean | null | any)
                            | (string | number | boolean | null | any)[]
                          )
                        | undefined;
                      containing?:
                        | (
                            | (string | number | boolean | null | any)
                            | (string | number | boolean | null | any)[]
                          )
                        | undefined;
                      greaterThan?:
                        | (
                            | (string | number | boolean | null | any)
                            | (string | number | boolean | null | any)[]
                          )
                        | undefined;
                      lessThan?:
                        | (
                            | (string | number | boolean | null | any)
                            | (string | number | boolean | null | any)[]
                          )
                        | undefined;
                    }
                )
              | {
                  [x: string]:
                    | (string | number | boolean | null | any)
                    | {
                        being?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        notBeing?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        startingWith?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        endingWith?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        containing?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        greaterThan?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        lessThan?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                      };
                }
              | (
                  | (
                      | (string | number | boolean | null | any)
                      | {
                          being?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          notBeing?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          startingWith?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          endingWith?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          containing?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          greaterThan?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          lessThan?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                        }
                    )
                  | {
                      [x: string]:
                        | (string | number | boolean | null | any)
                        | {
                            being?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            notBeing?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            startingWith?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            endingWith?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            containing?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            greaterThan?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            lessThan?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                          };
                    }
                )[]
              | {
                  [x: string]: (
                    | (
                        | (string | number | boolean | null | any)
                        | {
                            being?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            notBeing?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            startingWith?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            endingWith?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            containing?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            greaterThan?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            lessThan?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                          }
                      )
                    | {
                        [x: string]:
                          | (string | number | boolean | null | any)
                          | {
                              being?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              notBeing?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              startingWith?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              endingWith?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              containing?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              greaterThan?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              lessThan?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                            };
                      }
                  )[];
                };
          }[]
      )
    | undefined;
  including?: ('all' | string[]) | undefined;
  excluding?: string[] | undefined;
  orderedBy?:
    | (
        | {
            ascending?: string[] | undefined;
            descending?: string[] | undefined;
          }
        | undefined
      )
    | undefined;
  in?: string | undefined;
  before?: (string | null) | undefined;
  after?: (string | null) | undefined;
  limitedTo?: number | undefined;
};

type DropQuery = {
  drop: {
    [x: string]: {
      with?:
        | (
            | {
                [x: string]:
                  | (
                      | (string | number | boolean | null | any)
                      | {
                          being?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          notBeing?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          startingWith?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          endingWith?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          containing?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          greaterThan?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          lessThan?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                        }
                    )
                  | {
                      [x: string]:
                        | (string | number | boolean | null | any)
                        | {
                            being?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            notBeing?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            startingWith?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            endingWith?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            containing?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            greaterThan?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            lessThan?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                          };
                    }
                  | (
                      | (
                          | (string | number | boolean | null | any)
                          | {
                              being?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              notBeing?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              startingWith?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              endingWith?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              containing?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              greaterThan?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              lessThan?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                            }
                        )
                      | {
                          [x: string]:
                            | (string | number | boolean | null | any)
                            | {
                                being?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                notBeing?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                startingWith?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                endingWith?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                containing?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                greaterThan?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                lessThan?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                              };
                        }
                    )[]
                  | {
                      [x: string]: (
                        | (
                            | (string | number | boolean | null | any)
                            | {
                                being?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                notBeing?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                startingWith?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                endingWith?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                containing?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                greaterThan?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                lessThan?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                              }
                          )
                        | {
                            [x: string]:
                              | (string | number | boolean | null | any)
                              | {
                                  being?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  notBeing?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  startingWith?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  endingWith?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  containing?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  greaterThan?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  lessThan?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                };
                          }
                      )[];
                    };
              }
            | {
                [x: string]:
                  | (
                      | (string | number | boolean | null | any)
                      | {
                          being?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          notBeing?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          startingWith?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          endingWith?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          containing?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          greaterThan?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          lessThan?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                        }
                    )
                  | {
                      [x: string]:
                        | (string | number | boolean | null | any)
                        | {
                            being?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            notBeing?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            startingWith?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            endingWith?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            containing?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            greaterThan?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            lessThan?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                          };
                    }
                  | (
                      | (
                          | (string | number | boolean | null | any)
                          | {
                              being?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              notBeing?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              startingWith?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              endingWith?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              containing?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              greaterThan?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              lessThan?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                            }
                        )
                      | {
                          [x: string]:
                            | (string | number | boolean | null | any)
                            | {
                                being?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                notBeing?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                startingWith?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                endingWith?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                containing?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                greaterThan?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                lessThan?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                              };
                        }
                    )[]
                  | {
                      [x: string]: (
                        | (
                            | (string | number | boolean | null | any)
                            | {
                                being?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                notBeing?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                startingWith?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                endingWith?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                containing?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                greaterThan?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                lessThan?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                              }
                          )
                        | {
                            [x: string]:
                              | (string | number | boolean | null | any)
                              | {
                                  being?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  notBeing?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  startingWith?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  endingWith?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  containing?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  greaterThan?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  lessThan?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                };
                          }
                      )[];
                    };
              }[]
          )
        | undefined;
      including?: ('all' | string[]) | undefined;
      excluding?: string[] | undefined;
      orderedBy?:
        | (
            | {
                ascending?: string[] | undefined;
                descending?: string[] | undefined;
              }
            | undefined
          )
        | undefined;
      in?: string | undefined;
      before?: (string | null) | undefined;
      after?: (string | null) | undefined;
      limitedTo?: number | undefined;
    };
  };
};

type GetInstructions = {
  with?:
    | (
        | {
            [x: string]:
              | (
                  | (string | number | boolean | null | any)
                  | {
                      being?:
                        | (
                            | (string | number | boolean | null | any)
                            | (string | number | boolean | null | any)[]
                          )
                        | undefined;
                      notBeing?:
                        | (
                            | (string | number | boolean | null | any)
                            | (string | number | boolean | null | any)[]
                          )
                        | undefined;
                      startingWith?:
                        | (
                            | (string | number | boolean | null | any)
                            | (string | number | boolean | null | any)[]
                          )
                        | undefined;
                      endingWith?:
                        | (
                            | (string | number | boolean | null | any)
                            | (string | number | boolean | null | any)[]
                          )
                        | undefined;
                      containing?:
                        | (
                            | (string | number | boolean | null | any)
                            | (string | number | boolean | null | any)[]
                          )
                        | undefined;
                      greaterThan?:
                        | (
                            | (string | number | boolean | null | any)
                            | (string | number | boolean | null | any)[]
                          )
                        | undefined;
                      lessThan?:
                        | (
                            | (string | number | boolean | null | any)
                            | (string | number | boolean | null | any)[]
                          )
                        | undefined;
                    }
                )
              | {
                  [x: string]:
                    | (string | number | boolean | null | any)
                    | {
                        being?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        notBeing?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        startingWith?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        endingWith?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        containing?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        greaterThan?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        lessThan?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                      };
                }
              | (
                  | (
                      | (string | number | boolean | null | any)
                      | {
                          being?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          notBeing?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          startingWith?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          endingWith?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          containing?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          greaterThan?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          lessThan?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                        }
                    )
                  | {
                      [x: string]:
                        | (string | number | boolean | null | any)
                        | {
                            being?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            notBeing?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            startingWith?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            endingWith?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            containing?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            greaterThan?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            lessThan?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                          };
                    }
                )[]
              | {
                  [x: string]: (
                    | (
                        | (string | number | boolean | null | any)
                        | {
                            being?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            notBeing?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            startingWith?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            endingWith?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            containing?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            greaterThan?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            lessThan?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                          }
                      )
                    | {
                        [x: string]:
                          | (string | number | boolean | null | any)
                          | {
                              being?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              notBeing?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              startingWith?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              endingWith?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              containing?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              greaterThan?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              lessThan?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                            };
                      }
                  )[];
                };
          }
        | {
            [x: string]:
              | (
                  | (string | number | boolean | null | any)
                  | {
                      being?:
                        | (
                            | (string | number | boolean | null | any)
                            | (string | number | boolean | null | any)[]
                          )
                        | undefined;
                      notBeing?:
                        | (
                            | (string | number | boolean | null | any)
                            | (string | number | boolean | null | any)[]
                          )
                        | undefined;
                      startingWith?:
                        | (
                            | (string | number | boolean | null | any)
                            | (string | number | boolean | null | any)[]
                          )
                        | undefined;
                      endingWith?:
                        | (
                            | (string | number | boolean | null | any)
                            | (string | number | boolean | null | any)[]
                          )
                        | undefined;
                      containing?:
                        | (
                            | (string | number | boolean | null | any)
                            | (string | number | boolean | null | any)[]
                          )
                        | undefined;
                      greaterThan?:
                        | (
                            | (string | number | boolean | null | any)
                            | (string | number | boolean | null | any)[]
                          )
                        | undefined;
                      lessThan?:
                        | (
                            | (string | number | boolean | null | any)
                            | (string | number | boolean | null | any)[]
                          )
                        | undefined;
                    }
                )
              | {
                  [x: string]:
                    | (string | number | boolean | null | any)
                    | {
                        being?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        notBeing?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        startingWith?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        endingWith?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        containing?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        greaterThan?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        lessThan?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                      };
                }
              | (
                  | (
                      | (string | number | boolean | null | any)
                      | {
                          being?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          notBeing?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          startingWith?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          endingWith?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          containing?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          greaterThan?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          lessThan?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                        }
                    )
                  | {
                      [x: string]:
                        | (string | number | boolean | null | any)
                        | {
                            being?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            notBeing?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            startingWith?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            endingWith?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            containing?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            greaterThan?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            lessThan?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                          };
                    }
                )[]
              | {
                  [x: string]: (
                    | (
                        | (string | number | boolean | null | any)
                        | {
                            being?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            notBeing?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            startingWith?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            endingWith?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            containing?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            greaterThan?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            lessThan?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                          }
                      )
                    | {
                        [x: string]:
                          | (string | number | boolean | null | any)
                          | {
                              being?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              notBeing?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              startingWith?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              endingWith?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              containing?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              greaterThan?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              lessThan?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                            };
                      }
                  )[];
                };
          }[]
      )
    | undefined;
  including?: ('all' | string[]) | undefined;
  excluding?: string[] | undefined;
  orderedBy?:
    | (
        | {
            ascending?: string[] | undefined;
            descending?: string[] | undefined;
          }
        | undefined
      )
    | undefined;
  in?: string | undefined;
  before?: (string | null) | undefined;
  after?: (string | null) | undefined;
  limitedTo?: number | undefined;
};

type GetQuery = {
  get: {
    [x: string]: {
      with?:
        | (
            | {
                [x: string]:
                  | (
                      | (string | number | boolean | null | any)
                      | {
                          being?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          notBeing?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          startingWith?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          endingWith?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          containing?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          greaterThan?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          lessThan?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                        }
                    )
                  | {
                      [x: string]:
                        | (string | number | boolean | null | any)
                        | {
                            being?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            notBeing?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            startingWith?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            endingWith?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            containing?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            greaterThan?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            lessThan?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                          };
                    }
                  | (
                      | (
                          | (string | number | boolean | null | any)
                          | {
                              being?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              notBeing?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              startingWith?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              endingWith?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              containing?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              greaterThan?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              lessThan?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                            }
                        )
                      | {
                          [x: string]:
                            | (string | number | boolean | null | any)
                            | {
                                being?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                notBeing?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                startingWith?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                endingWith?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                containing?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                greaterThan?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                lessThan?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                              };
                        }
                    )[]
                  | {
                      [x: string]: (
                        | (
                            | (string | number | boolean | null | any)
                            | {
                                being?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                notBeing?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                startingWith?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                endingWith?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                containing?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                greaterThan?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                lessThan?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                              }
                          )
                        | {
                            [x: string]:
                              | (string | number | boolean | null | any)
                              | {
                                  being?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  notBeing?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  startingWith?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  endingWith?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  containing?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  greaterThan?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  lessThan?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                };
                          }
                      )[];
                    };
              }
            | {
                [x: string]:
                  | (
                      | (string | number | boolean | null | any)
                      | {
                          being?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          notBeing?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          startingWith?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          endingWith?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          containing?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          greaterThan?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          lessThan?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                        }
                    )
                  | {
                      [x: string]:
                        | (string | number | boolean | null | any)
                        | {
                            being?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            notBeing?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            startingWith?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            endingWith?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            containing?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            greaterThan?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            lessThan?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                          };
                    }
                  | (
                      | (
                          | (string | number | boolean | null | any)
                          | {
                              being?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              notBeing?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              startingWith?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              endingWith?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              containing?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              greaterThan?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              lessThan?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                            }
                        )
                      | {
                          [x: string]:
                            | (string | number | boolean | null | any)
                            | {
                                being?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                notBeing?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                startingWith?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                endingWith?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                containing?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                greaterThan?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                lessThan?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                              };
                        }
                    )[]
                  | {
                      [x: string]: (
                        | (
                            | (string | number | boolean | null | any)
                            | {
                                being?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                notBeing?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                startingWith?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                endingWith?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                containing?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                greaterThan?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                lessThan?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                              }
                          )
                        | {
                            [x: string]:
                              | (string | number | boolean | null | any)
                              | {
                                  being?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  notBeing?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  startingWith?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  endingWith?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  containing?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  greaterThan?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  lessThan?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                };
                          }
                      )[];
                    };
              }[]
          )
        | undefined;
      including?: ('all' | string[]) | undefined;
      excluding?: string[] | undefined;
      orderedBy?:
        | (
            | {
                ascending?: string[] | undefined;
                descending?: string[] | undefined;
              }
            | undefined
          )
        | undefined;
      in?: string | undefined;
      before?: (string | null) | undefined;
      after?: (string | null) | undefined;
      limitedTo?: number | undefined;
    } | null;
  };
};

type IncludingInstruction = 'all' | string[];

type Instruction =
  | 'with'
  | 'to'
  | 'including'
  | 'excluding'
  | 'orderedBy'
  | 'in'
  | 'before'
  | 'after'
  | 'limitedTo'
  | 'orderedBy.ascending'
  | 'orderedBy.descending';

type CombinedInstructions = {
  with:
    | {
        [x: string]:
          | (
              | (string | number | boolean | null | any)
              | {
                  being?:
                    | ((string | number | boolean | null | any) | (string | number | boolean | null | any)[])
                    | undefined;
                  notBeing?:
                    | ((string | number | boolean | null | any) | (string | number | boolean | null | any)[])
                    | undefined;
                  startingWith?:
                    | ((string | number | boolean | null | any) | (string | number | boolean | null | any)[])
                    | undefined;
                  endingWith?:
                    | ((string | number | boolean | null | any) | (string | number | boolean | null | any)[])
                    | undefined;
                  containing?:
                    | ((string | number | boolean | null | any) | (string | number | boolean | null | any)[])
                    | undefined;
                  greaterThan?:
                    | ((string | number | boolean | null | any) | (string | number | boolean | null | any)[])
                    | undefined;
                  lessThan?:
                    | ((string | number | boolean | null | any) | (string | number | boolean | null | any)[])
                    | undefined;
                }
            )
          | {
              [x: string]:
                | (string | number | boolean | null | any)
                | {
                    being?:
                      | (
                          | (string | number | boolean | null | any)
                          | (string | number | boolean | null | any)[]
                        )
                      | undefined;
                    notBeing?:
                      | (
                          | (string | number | boolean | null | any)
                          | (string | number | boolean | null | any)[]
                        )
                      | undefined;
                    startingWith?:
                      | (
                          | (string | number | boolean | null | any)
                          | (string | number | boolean | null | any)[]
                        )
                      | undefined;
                    endingWith?:
                      | (
                          | (string | number | boolean | null | any)
                          | (string | number | boolean | null | any)[]
                        )
                      | undefined;
                    containing?:
                      | (
                          | (string | number | boolean | null | any)
                          | (string | number | boolean | null | any)[]
                        )
                      | undefined;
                    greaterThan?:
                      | (
                          | (string | number | boolean | null | any)
                          | (string | number | boolean | null | any)[]
                        )
                      | undefined;
                    lessThan?:
                      | (
                          | (string | number | boolean | null | any)
                          | (string | number | boolean | null | any)[]
                        )
                      | undefined;
                  };
            }
          | (
              | (
                  | (string | number | boolean | null | any)
                  | {
                      being?:
                        | (
                            | (string | number | boolean | null | any)
                            | (string | number | boolean | null | any)[]
                          )
                        | undefined;
                      notBeing?:
                        | (
                            | (string | number | boolean | null | any)
                            | (string | number | boolean | null | any)[]
                          )
                        | undefined;
                      startingWith?:
                        | (
                            | (string | number | boolean | null | any)
                            | (string | number | boolean | null | any)[]
                          )
                        | undefined;
                      endingWith?:
                        | (
                            | (string | number | boolean | null | any)
                            | (string | number | boolean | null | any)[]
                          )
                        | undefined;
                      containing?:
                        | (
                            | (string | number | boolean | null | any)
                            | (string | number | boolean | null | any)[]
                          )
                        | undefined;
                      greaterThan?:
                        | (
                            | (string | number | boolean | null | any)
                            | (string | number | boolean | null | any)[]
                          )
                        | undefined;
                      lessThan?:
                        | (
                            | (string | number | boolean | null | any)
                            | (string | number | boolean | null | any)[]
                          )
                        | undefined;
                    }
                )
              | {
                  [x: string]:
                    | (string | number | boolean | null | any)
                    | {
                        being?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        notBeing?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        startingWith?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        endingWith?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        containing?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        greaterThan?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        lessThan?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                      };
                }
            )[]
          | {
              [x: string]: (
                | (
                    | (string | number | boolean | null | any)
                    | {
                        being?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        notBeing?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        startingWith?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        endingWith?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        containing?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        greaterThan?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        lessThan?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                      }
                  )
                | {
                    [x: string]:
                      | (string | number | boolean | null | any)
                      | {
                          being?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          notBeing?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          startingWith?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          endingWith?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          containing?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          greaterThan?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          lessThan?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                        };
                  }
              )[];
            };
      }
    | {
        [x: string]:
          | (
              | (string | number | boolean | null | any)
              | {
                  being?:
                    | ((string | number | boolean | null | any) | (string | number | boolean | null | any)[])
                    | undefined;
                  notBeing?:
                    | ((string | number | boolean | null | any) | (string | number | boolean | null | any)[])
                    | undefined;
                  startingWith?:
                    | ((string | number | boolean | null | any) | (string | number | boolean | null | any)[])
                    | undefined;
                  endingWith?:
                    | ((string | number | boolean | null | any) | (string | number | boolean | null | any)[])
                    | undefined;
                  containing?:
                    | ((string | number | boolean | null | any) | (string | number | boolean | null | any)[])
                    | undefined;
                  greaterThan?:
                    | ((string | number | boolean | null | any) | (string | number | boolean | null | any)[])
                    | undefined;
                  lessThan?:
                    | ((string | number | boolean | null | any) | (string | number | boolean | null | any)[])
                    | undefined;
                }
            )
          | {
              [x: string]:
                | (string | number | boolean | null | any)
                | {
                    being?:
                      | (
                          | (string | number | boolean | null | any)
                          | (string | number | boolean | null | any)[]
                        )
                      | undefined;
                    notBeing?:
                      | (
                          | (string | number | boolean | null | any)
                          | (string | number | boolean | null | any)[]
                        )
                      | undefined;
                    startingWith?:
                      | (
                          | (string | number | boolean | null | any)
                          | (string | number | boolean | null | any)[]
                        )
                      | undefined;
                    endingWith?:
                      | (
                          | (string | number | boolean | null | any)
                          | (string | number | boolean | null | any)[]
                        )
                      | undefined;
                    containing?:
                      | (
                          | (string | number | boolean | null | any)
                          | (string | number | boolean | null | any)[]
                        )
                      | undefined;
                    greaterThan?:
                      | (
                          | (string | number | boolean | null | any)
                          | (string | number | boolean | null | any)[]
                        )
                      | undefined;
                    lessThan?:
                      | (
                          | (string | number | boolean | null | any)
                          | (string | number | boolean | null | any)[]
                        )
                      | undefined;
                  };
            }
          | (
              | (
                  | (string | number | boolean | null | any)
                  | {
                      being?:
                        | (
                            | (string | number | boolean | null | any)
                            | (string | number | boolean | null | any)[]
                          )
                        | undefined;
                      notBeing?:
                        | (
                            | (string | number | boolean | null | any)
                            | (string | number | boolean | null | any)[]
                          )
                        | undefined;
                      startingWith?:
                        | (
                            | (string | number | boolean | null | any)
                            | (string | number | boolean | null | any)[]
                          )
                        | undefined;
                      endingWith?:
                        | (
                            | (string | number | boolean | null | any)
                            | (string | number | boolean | null | any)[]
                          )
                        | undefined;
                      containing?:
                        | (
                            | (string | number | boolean | null | any)
                            | (string | number | boolean | null | any)[]
                          )
                        | undefined;
                      greaterThan?:
                        | (
                            | (string | number | boolean | null | any)
                            | (string | number | boolean | null | any)[]
                          )
                        | undefined;
                      lessThan?:
                        | (
                            | (string | number | boolean | null | any)
                            | (string | number | boolean | null | any)[]
                          )
                        | undefined;
                    }
                )
              | {
                  [x: string]:
                    | (string | number | boolean | null | any)
                    | {
                        being?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        notBeing?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        startingWith?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        endingWith?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        containing?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        greaterThan?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        lessThan?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                      };
                }
            )[]
          | {
              [x: string]: (
                | (
                    | (string | number | boolean | null | any)
                    | {
                        being?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        notBeing?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        startingWith?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        endingWith?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        containing?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        greaterThan?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        lessThan?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                      }
                  )
                | {
                    [x: string]:
                      | (string | number | boolean | null | any)
                      | {
                          being?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          notBeing?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          startingWith?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          endingWith?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          containing?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          greaterThan?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          lessThan?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                        };
                  }
              )[];
            };
      }[];
  to: {
    [x: string]: string | number | boolean | null | any;
  };
  including: 'all' | string[];
  excluding: string[];
  orderedBy?:
    | {
        ascending?: string[] | undefined;
        descending?: string[] | undefined;
      }
    | undefined;
  in: string;
  before: string | null;
  after: string | null;
  limitedTo: number;
};

type OrderedByInstruction =
  | {
      ascending?: string[] | undefined;
      descending?: string[] | undefined;
    }
  | undefined;

type QueryPaginationOptions = {
  moreBefore?: (string | null) | undefined;
  moreAfter?: (string | null) | undefined;
};

type Query = {
  count?:
    | {
        [x: string]: {
          with?:
            | (
                | {
                    [x: string]:
                      | (
                          | (string | number | boolean | null | any)
                          | {
                              being?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              notBeing?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              startingWith?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              endingWith?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              containing?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              greaterThan?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              lessThan?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                            }
                        )
                      | {
                          [x: string]:
                            | (string | number | boolean | null | any)
                            | {
                                being?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                notBeing?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                startingWith?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                endingWith?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                containing?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                greaterThan?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                lessThan?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                              };
                        }
                      | (
                          | (
                              | (string | number | boolean | null | any)
                              | {
                                  being?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  notBeing?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  startingWith?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  endingWith?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  containing?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  greaterThan?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  lessThan?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                }
                            )
                          | {
                              [x: string]:
                                | (string | number | boolean | null | any)
                                | {
                                    being?:
                                      | (
                                          | (string | number | boolean | null | any)
                                          | (string | number | boolean | null | any)[]
                                        )
                                      | undefined;
                                    notBeing?:
                                      | (
                                          | (string | number | boolean | null | any)
                                          | (string | number | boolean | null | any)[]
                                        )
                                      | undefined;
                                    startingWith?:
                                      | (
                                          | (string | number | boolean | null | any)
                                          | (string | number | boolean | null | any)[]
                                        )
                                      | undefined;
                                    endingWith?:
                                      | (
                                          | (string | number | boolean | null | any)
                                          | (string | number | boolean | null | any)[]
                                        )
                                      | undefined;
                                    containing?:
                                      | (
                                          | (string | number | boolean | null | any)
                                          | (string | number | boolean | null | any)[]
                                        )
                                      | undefined;
                                    greaterThan?:
                                      | (
                                          | (string | number | boolean | null | any)
                                          | (string | number | boolean | null | any)[]
                                        )
                                      | undefined;
                                    lessThan?:
                                      | (
                                          | (string | number | boolean | null | any)
                                          | (string | number | boolean | null | any)[]
                                        )
                                      | undefined;
                                  };
                            }
                        )[]
                      | {
                          [x: string]: (
                            | (
                                | (string | number | boolean | null | any)
                                | {
                                    being?:
                                      | (
                                          | (string | number | boolean | null | any)
                                          | (string | number | boolean | null | any)[]
                                        )
                                      | undefined;
                                    notBeing?:
                                      | (
                                          | (string | number | boolean | null | any)
                                          | (string | number | boolean | null | any)[]
                                        )
                                      | undefined;
                                    startingWith?:
                                      | (
                                          | (string | number | boolean | null | any)
                                          | (string | number | boolean | null | any)[]
                                        )
                                      | undefined;
                                    endingWith?:
                                      | (
                                          | (string | number | boolean | null | any)
                                          | (string | number | boolean | null | any)[]
                                        )
                                      | undefined;
                                    containing?:
                                      | (
                                          | (string | number | boolean | null | any)
                                          | (string | number | boolean | null | any)[]
                                        )
                                      | undefined;
                                    greaterThan?:
                                      | (
                                          | (string | number | boolean | null | any)
                                          | (string | number | boolean | null | any)[]
                                        )
                                      | undefined;
                                    lessThan?:
                                      | (
                                          | (string | number | boolean | null | any)
                                          | (string | number | boolean | null | any)[]
                                        )
                                      | undefined;
                                  }
                              )
                            | {
                                [x: string]:
                                  | (string | number | boolean | null | any)
                                  | {
                                      being?:
                                        | (
                                            | (string | number | boolean | null | any)
                                            | (string | number | boolean | null | any)[]
                                          )
                                        | undefined;
                                      notBeing?:
                                        | (
                                            | (string | number | boolean | null | any)
                                            | (string | number | boolean | null | any)[]
                                          )
                                        | undefined;
                                      startingWith?:
                                        | (
                                            | (string | number | boolean | null | any)
                                            | (string | number | boolean | null | any)[]
                                          )
                                        | undefined;
                                      endingWith?:
                                        | (
                                            | (string | number | boolean | null | any)
                                            | (string | number | boolean | null | any)[]
                                          )
                                        | undefined;
                                      containing?:
                                        | (
                                            | (string | number | boolean | null | any)
                                            | (string | number | boolean | null | any)[]
                                          )
                                        | undefined;
                                      greaterThan?:
                                        | (
                                            | (string | number | boolean | null | any)
                                            | (string | number | boolean | null | any)[]
                                          )
                                        | undefined;
                                      lessThan?:
                                        | (
                                            | (string | number | boolean | null | any)
                                            | (string | number | boolean | null | any)[]
                                          )
                                        | undefined;
                                    };
                              }
                          )[];
                        };
                  }
                | {
                    [x: string]:
                      | (
                          | (string | number | boolean | null | any)
                          | {
                              being?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              notBeing?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              startingWith?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              endingWith?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              containing?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              greaterThan?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              lessThan?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                            }
                        )
                      | {
                          [x: string]:
                            | (string | number | boolean | null | any)
                            | {
                                being?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                notBeing?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                startingWith?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                endingWith?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                containing?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                greaterThan?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                lessThan?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                              };
                        }
                      | (
                          | (
                              | (string | number | boolean | null | any)
                              | {
                                  being?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  notBeing?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  startingWith?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  endingWith?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  containing?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  greaterThan?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  lessThan?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                }
                            )
                          | {
                              [x: string]:
                                | (string | number | boolean | null | any)
                                | {
                                    being?:
                                      | (
                                          | (string | number | boolean | null | any)
                                          | (string | number | boolean | null | any)[]
                                        )
                                      | undefined;
                                    notBeing?:
                                      | (
                                          | (string | number | boolean | null | any)
                                          | (string | number | boolean | null | any)[]
                                        )
                                      | undefined;
                                    startingWith?:
                                      | (
                                          | (string | number | boolean | null | any)
                                          | (string | number | boolean | null | any)[]
                                        )
                                      | undefined;
                                    endingWith?:
                                      | (
                                          | (string | number | boolean | null | any)
                                          | (string | number | boolean | null | any)[]
                                        )
                                      | undefined;
                                    containing?:
                                      | (
                                          | (string | number | boolean | null | any)
                                          | (string | number | boolean | null | any)[]
                                        )
                                      | undefined;
                                    greaterThan?:
                                      | (
                                          | (string | number | boolean | null | any)
                                          | (string | number | boolean | null | any)[]
                                        )
                                      | undefined;
                                    lessThan?:
                                      | (
                                          | (string | number | boolean | null | any)
                                          | (string | number | boolean | null | any)[]
                                        )
                                      | undefined;
                                  };
                            }
                        )[]
                      | {
                          [x: string]: (
                            | (
                                | (string | number | boolean | null | any)
                                | {
                                    being?:
                                      | (
                                          | (string | number | boolean | null | any)
                                          | (string | number | boolean | null | any)[]
                                        )
                                      | undefined;
                                    notBeing?:
                                      | (
                                          | (string | number | boolean | null | any)
                                          | (string | number | boolean | null | any)[]
                                        )
                                      | undefined;
                                    startingWith?:
                                      | (
                                          | (string | number | boolean | null | any)
                                          | (string | number | boolean | null | any)[]
                                        )
                                      | undefined;
                                    endingWith?:
                                      | (
                                          | (string | number | boolean | null | any)
                                          | (string | number | boolean | null | any)[]
                                        )
                                      | undefined;
                                    containing?:
                                      | (
                                          | (string | number | boolean | null | any)
                                          | (string | number | boolean | null | any)[]
                                        )
                                      | undefined;
                                    greaterThan?:
                                      | (
                                          | (string | number | boolean | null | any)
                                          | (string | number | boolean | null | any)[]
                                        )
                                      | undefined;
                                    lessThan?:
                                      | (
                                          | (string | number | boolean | null | any)
                                          | (string | number | boolean | null | any)[]
                                        )
                                      | undefined;
                                  }
                              )
                            | {
                                [x: string]:
                                  | (string | number | boolean | null | any)
                                  | {
                                      being?:
                                        | (
                                            | (string | number | boolean | null | any)
                                            | (string | number | boolean | null | any)[]
                                          )
                                        | undefined;
                                      notBeing?:
                                        | (
                                            | (string | number | boolean | null | any)
                                            | (string | number | boolean | null | any)[]
                                          )
                                        | undefined;
                                      startingWith?:
                                        | (
                                            | (string | number | boolean | null | any)
                                            | (string | number | boolean | null | any)[]
                                          )
                                        | undefined;
                                      endingWith?:
                                        | (
                                            | (string | number | boolean | null | any)
                                            | (string | number | boolean | null | any)[]
                                          )
                                        | undefined;
                                      containing?:
                                        | (
                                            | (string | number | boolean | null | any)
                                            | (string | number | boolean | null | any)[]
                                          )
                                        | undefined;
                                      greaterThan?:
                                        | (
                                            | (string | number | boolean | null | any)
                                            | (string | number | boolean | null | any)[]
                                          )
                                        | undefined;
                                      lessThan?:
                                        | (
                                            | (string | number | boolean | null | any)
                                            | (string | number | boolean | null | any)[]
                                          )
                                        | undefined;
                                    };
                              }
                          )[];
                        };
                  }[]
              )
            | undefined;
          including?: ('all' | string[]) | undefined;
          excluding?: string[] | undefined;
          orderedBy?:
            | (
                | {
                    ascending?: string[] | undefined;
                    descending?: string[] | undefined;
                  }
                | undefined
              )
            | undefined;
          in?: string | undefined;
          before?: (string | null) | undefined;
          after?: (string | null) | undefined;
          limitedTo?: number | undefined;
        } | null;
      }
    | undefined;
  create?:
    | {
        [x: string]: {
          including?: ('all' | string[]) | undefined;
          excluding?: string[] | undefined;
          orderedBy?:
            | (
                | {
                    ascending?: string[] | undefined;
                    descending?: string[] | undefined;
                  }
                | undefined
              )
            | undefined;
          in?: string | undefined;
          before?: (string | null) | undefined;
          after?: (string | null) | undefined;
          limitedTo?: number | undefined;
          with: {
            [x: string]:
              | (
                  | (string | number | boolean | null | any)
                  | {
                      being?:
                        | (
                            | (string | number | boolean | null | any)
                            | (string | number | boolean | null | any)[]
                          )
                        | undefined;
                      notBeing?:
                        | (
                            | (string | number | boolean | null | any)
                            | (string | number | boolean | null | any)[]
                          )
                        | undefined;
                      startingWith?:
                        | (
                            | (string | number | boolean | null | any)
                            | (string | number | boolean | null | any)[]
                          )
                        | undefined;
                      endingWith?:
                        | (
                            | (string | number | boolean | null | any)
                            | (string | number | boolean | null | any)[]
                          )
                        | undefined;
                      containing?:
                        | (
                            | (string | number | boolean | null | any)
                            | (string | number | boolean | null | any)[]
                          )
                        | undefined;
                      greaterThan?:
                        | (
                            | (string | number | boolean | null | any)
                            | (string | number | boolean | null | any)[]
                          )
                        | undefined;
                      lessThan?:
                        | (
                            | (string | number | boolean | null | any)
                            | (string | number | boolean | null | any)[]
                          )
                        | undefined;
                    }
                )
              | {
                  [x: string]:
                    | (string | number | boolean | null | any)
                    | {
                        being?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        notBeing?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        startingWith?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        endingWith?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        containing?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        greaterThan?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        lessThan?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                      };
                }
              | (
                  | (
                      | (string | number | boolean | null | any)
                      | {
                          being?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          notBeing?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          startingWith?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          endingWith?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          containing?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          greaterThan?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          lessThan?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                        }
                    )
                  | {
                      [x: string]:
                        | (string | number | boolean | null | any)
                        | {
                            being?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            notBeing?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            startingWith?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            endingWith?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            containing?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            greaterThan?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            lessThan?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                          };
                    }
                )[]
              | {
                  [x: string]: (
                    | (
                        | (string | number | boolean | null | any)
                        | {
                            being?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            notBeing?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            startingWith?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            endingWith?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            containing?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            greaterThan?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            lessThan?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                          }
                      )
                    | {
                        [x: string]:
                          | (string | number | boolean | null | any)
                          | {
                              being?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              notBeing?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              startingWith?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              endingWith?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              containing?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              greaterThan?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              lessThan?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                            };
                      }
                  )[];
                };
          };
        };
      }
    | undefined;
  drop?:
    | {
        [x: string]: {
          with?:
            | (
                | {
                    [x: string]:
                      | (
                          | (string | number | boolean | null | any)
                          | {
                              being?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              notBeing?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              startingWith?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              endingWith?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              containing?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              greaterThan?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              lessThan?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                            }
                        )
                      | {
                          [x: string]:
                            | (string | number | boolean | null | any)
                            | {
                                being?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                notBeing?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                startingWith?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                endingWith?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                containing?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                greaterThan?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                lessThan?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                              };
                        }
                      | (
                          | (
                              | (string | number | boolean | null | any)
                              | {
                                  being?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  notBeing?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  startingWith?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  endingWith?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  containing?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  greaterThan?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  lessThan?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                }
                            )
                          | {
                              [x: string]:
                                | (string | number | boolean | null | any)
                                | {
                                    being?:
                                      | (
                                          | (string | number | boolean | null | any)
                                          | (string | number | boolean | null | any)[]
                                        )
                                      | undefined;
                                    notBeing?:
                                      | (
                                          | (string | number | boolean | null | any)
                                          | (string | number | boolean | null | any)[]
                                        )
                                      | undefined;
                                    startingWith?:
                                      | (
                                          | (string | number | boolean | null | any)
                                          | (string | number | boolean | null | any)[]
                                        )
                                      | undefined;
                                    endingWith?:
                                      | (
                                          | (string | number | boolean | null | any)
                                          | (string | number | boolean | null | any)[]
                                        )
                                      | undefined;
                                    containing?:
                                      | (
                                          | (string | number | boolean | null | any)
                                          | (string | number | boolean | null | any)[]
                                        )
                                      | undefined;
                                    greaterThan?:
                                      | (
                                          | (string | number | boolean | null | any)
                                          | (string | number | boolean | null | any)[]
                                        )
                                      | undefined;
                                    lessThan?:
                                      | (
                                          | (string | number | boolean | null | any)
                                          | (string | number | boolean | null | any)[]
                                        )
                                      | undefined;
                                  };
                            }
                        )[]
                      | {
                          [x: string]: (
                            | (
                                | (string | number | boolean | null | any)
                                | {
                                    being?:
                                      | (
                                          | (string | number | boolean | null | any)
                                          | (string | number | boolean | null | any)[]
                                        )
                                      | undefined;
                                    notBeing?:
                                      | (
                                          | (string | number | boolean | null | any)
                                          | (string | number | boolean | null | any)[]
                                        )
                                      | undefined;
                                    startingWith?:
                                      | (
                                          | (string | number | boolean | null | any)
                                          | (string | number | boolean | null | any)[]
                                        )
                                      | undefined;
                                    endingWith?:
                                      | (
                                          | (string | number | boolean | null | any)
                                          | (string | number | boolean | null | any)[]
                                        )
                                      | undefined;
                                    containing?:
                                      | (
                                          | (string | number | boolean | null | any)
                                          | (string | number | boolean | null | any)[]
                                        )
                                      | undefined;
                                    greaterThan?:
                                      | (
                                          | (string | number | boolean | null | any)
                                          | (string | number | boolean | null | any)[]
                                        )
                                      | undefined;
                                    lessThan?:
                                      | (
                                          | (string | number | boolean | null | any)
                                          | (string | number | boolean | null | any)[]
                                        )
                                      | undefined;
                                  }
                              )
                            | {
                                [x: string]:
                                  | (string | number | boolean | null | any)
                                  | {
                                      being?:
                                        | (
                                            | (string | number | boolean | null | any)
                                            | (string | number | boolean | null | any)[]
                                          )
                                        | undefined;
                                      notBeing?:
                                        | (
                                            | (string | number | boolean | null | any)
                                            | (string | number | boolean | null | any)[]
                                          )
                                        | undefined;
                                      startingWith?:
                                        | (
                                            | (string | number | boolean | null | any)
                                            | (string | number | boolean | null | any)[]
                                          )
                                        | undefined;
                                      endingWith?:
                                        | (
                                            | (string | number | boolean | null | any)
                                            | (string | number | boolean | null | any)[]
                                          )
                                        | undefined;
                                      containing?:
                                        | (
                                            | (string | number | boolean | null | any)
                                            | (string | number | boolean | null | any)[]
                                          )
                                        | undefined;
                                      greaterThan?:
                                        | (
                                            | (string | number | boolean | null | any)
                                            | (string | number | boolean | null | any)[]
                                          )
                                        | undefined;
                                      lessThan?:
                                        | (
                                            | (string | number | boolean | null | any)
                                            | (string | number | boolean | null | any)[]
                                          )
                                        | undefined;
                                    };
                              }
                          )[];
                        };
                  }
                | {
                    [x: string]:
                      | (
                          | (string | number | boolean | null | any)
                          | {
                              being?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              notBeing?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              startingWith?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              endingWith?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              containing?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              greaterThan?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              lessThan?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                            }
                        )
                      | {
                          [x: string]:
                            | (string | number | boolean | null | any)
                            | {
                                being?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                notBeing?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                startingWith?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                endingWith?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                containing?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                greaterThan?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                lessThan?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                              };
                        }
                      | (
                          | (
                              | (string | number | boolean | null | any)
                              | {
                                  being?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  notBeing?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  startingWith?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  endingWith?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  containing?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  greaterThan?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  lessThan?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                }
                            )
                          | {
                              [x: string]:
                                | (string | number | boolean | null | any)
                                | {
                                    being?:
                                      | (
                                          | (string | number | boolean | null | any)
                                          | (string | number | boolean | null | any)[]
                                        )
                                      | undefined;
                                    notBeing?:
                                      | (
                                          | (string | number | boolean | null | any)
                                          | (string | number | boolean | null | any)[]
                                        )
                                      | undefined;
                                    startingWith?:
                                      | (
                                          | (string | number | boolean | null | any)
                                          | (string | number | boolean | null | any)[]
                                        )
                                      | undefined;
                                    endingWith?:
                                      | (
                                          | (string | number | boolean | null | any)
                                          | (string | number | boolean | null | any)[]
                                        )
                                      | undefined;
                                    containing?:
                                      | (
                                          | (string | number | boolean | null | any)
                                          | (string | number | boolean | null | any)[]
                                        )
                                      | undefined;
                                    greaterThan?:
                                      | (
                                          | (string | number | boolean | null | any)
                                          | (string | number | boolean | null | any)[]
                                        )
                                      | undefined;
                                    lessThan?:
                                      | (
                                          | (string | number | boolean | null | any)
                                          | (string | number | boolean | null | any)[]
                                        )
                                      | undefined;
                                  };
                            }
                        )[]
                      | {
                          [x: string]: (
                            | (
                                | (string | number | boolean | null | any)
                                | {
                                    being?:
                                      | (
                                          | (string | number | boolean | null | any)
                                          | (string | number | boolean | null | any)[]
                                        )
                                      | undefined;
                                    notBeing?:
                                      | (
                                          | (string | number | boolean | null | any)
                                          | (string | number | boolean | null | any)[]
                                        )
                                      | undefined;
                                    startingWith?:
                                      | (
                                          | (string | number | boolean | null | any)
                                          | (string | number | boolean | null | any)[]
                                        )
                                      | undefined;
                                    endingWith?:
                                      | (
                                          | (string | number | boolean | null | any)
                                          | (string | number | boolean | null | any)[]
                                        )
                                      | undefined;
                                    containing?:
                                      | (
                                          | (string | number | boolean | null | any)
                                          | (string | number | boolean | null | any)[]
                                        )
                                      | undefined;
                                    greaterThan?:
                                      | (
                                          | (string | number | boolean | null | any)
                                          | (string | number | boolean | null | any)[]
                                        )
                                      | undefined;
                                    lessThan?:
                                      | (
                                          | (string | number | boolean | null | any)
                                          | (string | number | boolean | null | any)[]
                                        )
                                      | undefined;
                                  }
                              )
                            | {
                                [x: string]:
                                  | (string | number | boolean | null | any)
                                  | {
                                      being?:
                                        | (
                                            | (string | number | boolean | null | any)
                                            | (string | number | boolean | null | any)[]
                                          )
                                        | undefined;
                                      notBeing?:
                                        | (
                                            | (string | number | boolean | null | any)
                                            | (string | number | boolean | null | any)[]
                                          )
                                        | undefined;
                                      startingWith?:
                                        | (
                                            | (string | number | boolean | null | any)
                                            | (string | number | boolean | null | any)[]
                                          )
                                        | undefined;
                                      endingWith?:
                                        | (
                                            | (string | number | boolean | null | any)
                                            | (string | number | boolean | null | any)[]
                                          )
                                        | undefined;
                                      containing?:
                                        | (
                                            | (string | number | boolean | null | any)
                                            | (string | number | boolean | null | any)[]
                                          )
                                        | undefined;
                                      greaterThan?:
                                        | (
                                            | (string | number | boolean | null | any)
                                            | (string | number | boolean | null | any)[]
                                          )
                                        | undefined;
                                      lessThan?:
                                        | (
                                            | (string | number | boolean | null | any)
                                            | (string | number | boolean | null | any)[]
                                          )
                                        | undefined;
                                    };
                              }
                          )[];
                        };
                  }[]
              )
            | undefined;
          including?: ('all' | string[]) | undefined;
          excluding?: string[] | undefined;
          orderedBy?:
            | (
                | {
                    ascending?: string[] | undefined;
                    descending?: string[] | undefined;
                  }
                | undefined
              )
            | undefined;
          in?: string | undefined;
          before?: (string | null) | undefined;
          after?: (string | null) | undefined;
          limitedTo?: number | undefined;
        };
      }
    | undefined;
  get?:
    | {
        [x: string]: {
          with?:
            | (
                | {
                    [x: string]:
                      | (
                          | (string | number | boolean | null | any)
                          | {
                              being?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              notBeing?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              startingWith?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              endingWith?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              containing?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              greaterThan?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              lessThan?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                            }
                        )
                      | {
                          [x: string]:
                            | (string | number | boolean | null | any)
                            | {
                                being?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                notBeing?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                startingWith?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                endingWith?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                containing?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                greaterThan?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                lessThan?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                              };
                        }
                      | (
                          | (
                              | (string | number | boolean | null | any)
                              | {
                                  being?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  notBeing?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  startingWith?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  endingWith?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  containing?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  greaterThan?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  lessThan?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                }
                            )
                          | {
                              [x: string]:
                                | (string | number | boolean | null | any)
                                | {
                                    being?:
                                      | (
                                          | (string | number | boolean | null | any)
                                          | (string | number | boolean | null | any)[]
                                        )
                                      | undefined;
                                    notBeing?:
                                      | (
                                          | (string | number | boolean | null | any)
                                          | (string | number | boolean | null | any)[]
                                        )
                                      | undefined;
                                    startingWith?:
                                      | (
                                          | (string | number | boolean | null | any)
                                          | (string | number | boolean | null | any)[]
                                        )
                                      | undefined;
                                    endingWith?:
                                      | (
                                          | (string | number | boolean | null | any)
                                          | (string | number | boolean | null | any)[]
                                        )
                                      | undefined;
                                    containing?:
                                      | (
                                          | (string | number | boolean | null | any)
                                          | (string | number | boolean | null | any)[]
                                        )
                                      | undefined;
                                    greaterThan?:
                                      | (
                                          | (string | number | boolean | null | any)
                                          | (string | number | boolean | null | any)[]
                                        )
                                      | undefined;
                                    lessThan?:
                                      | (
                                          | (string | number | boolean | null | any)
                                          | (string | number | boolean | null | any)[]
                                        )
                                      | undefined;
                                  };
                            }
                        )[]
                      | {
                          [x: string]: (
                            | (
                                | (string | number | boolean | null | any)
                                | {
                                    being?:
                                      | (
                                          | (string | number | boolean | null | any)
                                          | (string | number | boolean | null | any)[]
                                        )
                                      | undefined;
                                    notBeing?:
                                      | (
                                          | (string | number | boolean | null | any)
                                          | (string | number | boolean | null | any)[]
                                        )
                                      | undefined;
                                    startingWith?:
                                      | (
                                          | (string | number | boolean | null | any)
                                          | (string | number | boolean | null | any)[]
                                        )
                                      | undefined;
                                    endingWith?:
                                      | (
                                          | (string | number | boolean | null | any)
                                          | (string | number | boolean | null | any)[]
                                        )
                                      | undefined;
                                    containing?:
                                      | (
                                          | (string | number | boolean | null | any)
                                          | (string | number | boolean | null | any)[]
                                        )
                                      | undefined;
                                    greaterThan?:
                                      | (
                                          | (string | number | boolean | null | any)
                                          | (string | number | boolean | null | any)[]
                                        )
                                      | undefined;
                                    lessThan?:
                                      | (
                                          | (string | number | boolean | null | any)
                                          | (string | number | boolean | null | any)[]
                                        )
                                      | undefined;
                                  }
                              )
                            | {
                                [x: string]:
                                  | (string | number | boolean | null | any)
                                  | {
                                      being?:
                                        | (
                                            | (string | number | boolean | null | any)
                                            | (string | number | boolean | null | any)[]
                                          )
                                        | undefined;
                                      notBeing?:
                                        | (
                                            | (string | number | boolean | null | any)
                                            | (string | number | boolean | null | any)[]
                                          )
                                        | undefined;
                                      startingWith?:
                                        | (
                                            | (string | number | boolean | null | any)
                                            | (string | number | boolean | null | any)[]
                                          )
                                        | undefined;
                                      endingWith?:
                                        | (
                                            | (string | number | boolean | null | any)
                                            | (string | number | boolean | null | any)[]
                                          )
                                        | undefined;
                                      containing?:
                                        | (
                                            | (string | number | boolean | null | any)
                                            | (string | number | boolean | null | any)[]
                                          )
                                        | undefined;
                                      greaterThan?:
                                        | (
                                            | (string | number | boolean | null | any)
                                            | (string | number | boolean | null | any)[]
                                          )
                                        | undefined;
                                      lessThan?:
                                        | (
                                            | (string | number | boolean | null | any)
                                            | (string | number | boolean | null | any)[]
                                          )
                                        | undefined;
                                    };
                              }
                          )[];
                        };
                  }
                | {
                    [x: string]:
                      | (
                          | (string | number | boolean | null | any)
                          | {
                              being?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              notBeing?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              startingWith?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              endingWith?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              containing?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              greaterThan?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              lessThan?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                            }
                        )
                      | {
                          [x: string]:
                            | (string | number | boolean | null | any)
                            | {
                                being?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                notBeing?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                startingWith?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                endingWith?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                containing?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                greaterThan?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                lessThan?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                              };
                        }
                      | (
                          | (
                              | (string | number | boolean | null | any)
                              | {
                                  being?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  notBeing?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  startingWith?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  endingWith?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  containing?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  greaterThan?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  lessThan?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                }
                            )
                          | {
                              [x: string]:
                                | (string | number | boolean | null | any)
                                | {
                                    being?:
                                      | (
                                          | (string | number | boolean | null | any)
                                          | (string | number | boolean | null | any)[]
                                        )
                                      | undefined;
                                    notBeing?:
                                      | (
                                          | (string | number | boolean | null | any)
                                          | (string | number | boolean | null | any)[]
                                        )
                                      | undefined;
                                    startingWith?:
                                      | (
                                          | (string | number | boolean | null | any)
                                          | (string | number | boolean | null | any)[]
                                        )
                                      | undefined;
                                    endingWith?:
                                      | (
                                          | (string | number | boolean | null | any)
                                          | (string | number | boolean | null | any)[]
                                        )
                                      | undefined;
                                    containing?:
                                      | (
                                          | (string | number | boolean | null | any)
                                          | (string | number | boolean | null | any)[]
                                        )
                                      | undefined;
                                    greaterThan?:
                                      | (
                                          | (string | number | boolean | null | any)
                                          | (string | number | boolean | null | any)[]
                                        )
                                      | undefined;
                                    lessThan?:
                                      | (
                                          | (string | number | boolean | null | any)
                                          | (string | number | boolean | null | any)[]
                                        )
                                      | undefined;
                                  };
                            }
                        )[]
                      | {
                          [x: string]: (
                            | (
                                | (string | number | boolean | null | any)
                                | {
                                    being?:
                                      | (
                                          | (string | number | boolean | null | any)
                                          | (string | number | boolean | null | any)[]
                                        )
                                      | undefined;
                                    notBeing?:
                                      | (
                                          | (string | number | boolean | null | any)
                                          | (string | number | boolean | null | any)[]
                                        )
                                      | undefined;
                                    startingWith?:
                                      | (
                                          | (string | number | boolean | null | any)
                                          | (string | number | boolean | null | any)[]
                                        )
                                      | undefined;
                                    endingWith?:
                                      | (
                                          | (string | number | boolean | null | any)
                                          | (string | number | boolean | null | any)[]
                                        )
                                      | undefined;
                                    containing?:
                                      | (
                                          | (string | number | boolean | null | any)
                                          | (string | number | boolean | null | any)[]
                                        )
                                      | undefined;
                                    greaterThan?:
                                      | (
                                          | (string | number | boolean | null | any)
                                          | (string | number | boolean | null | any)[]
                                        )
                                      | undefined;
                                    lessThan?:
                                      | (
                                          | (string | number | boolean | null | any)
                                          | (string | number | boolean | null | any)[]
                                        )
                                      | undefined;
                                  }
                              )
                            | {
                                [x: string]:
                                  | (string | number | boolean | null | any)
                                  | {
                                      being?:
                                        | (
                                            | (string | number | boolean | null | any)
                                            | (string | number | boolean | null | any)[]
                                          )
                                        | undefined;
                                      notBeing?:
                                        | (
                                            | (string | number | boolean | null | any)
                                            | (string | number | boolean | null | any)[]
                                          )
                                        | undefined;
                                      startingWith?:
                                        | (
                                            | (string | number | boolean | null | any)
                                            | (string | number | boolean | null | any)[]
                                          )
                                        | undefined;
                                      endingWith?:
                                        | (
                                            | (string | number | boolean | null | any)
                                            | (string | number | boolean | null | any)[]
                                          )
                                        | undefined;
                                      containing?:
                                        | (
                                            | (string | number | boolean | null | any)
                                            | (string | number | boolean | null | any)[]
                                          )
                                        | undefined;
                                      greaterThan?:
                                        | (
                                            | (string | number | boolean | null | any)
                                            | (string | number | boolean | null | any)[]
                                          )
                                        | undefined;
                                      lessThan?:
                                        | (
                                            | (string | number | boolean | null | any)
                                            | (string | number | boolean | null | any)[]
                                          )
                                        | undefined;
                                    };
                              }
                          )[];
                        };
                  }[]
              )
            | undefined;
          including?: ('all' | string[]) | undefined;
          excluding?: string[] | undefined;
          orderedBy?:
            | (
                | {
                    ascending?: string[] | undefined;
                    descending?: string[] | undefined;
                  }
                | undefined
              )
            | undefined;
          in?: string | undefined;
          before?: (string | null) | undefined;
          after?: (string | null) | undefined;
          limitedTo?: number | undefined;
        } | null;
      }
    | undefined;
  set?:
    | {
        [x: string]: {
          with?:
            | (
                | {
                    [x: string]:
                      | (
                          | (string | number | boolean | null | any)
                          | {
                              being?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              notBeing?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              startingWith?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              endingWith?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              containing?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              greaterThan?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              lessThan?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                            }
                        )
                      | {
                          [x: string]:
                            | (string | number | boolean | null | any)
                            | {
                                being?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                notBeing?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                startingWith?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                endingWith?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                containing?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                greaterThan?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                lessThan?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                              };
                        }
                      | (
                          | (
                              | (string | number | boolean | null | any)
                              | {
                                  being?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  notBeing?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  startingWith?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  endingWith?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  containing?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  greaterThan?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  lessThan?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                }
                            )
                          | {
                              [x: string]:
                                | (string | number | boolean | null | any)
                                | {
                                    being?:
                                      | (
                                          | (string | number | boolean | null | any)
                                          | (string | number | boolean | null | any)[]
                                        )
                                      | undefined;
                                    notBeing?:
                                      | (
                                          | (string | number | boolean | null | any)
                                          | (string | number | boolean | null | any)[]
                                        )
                                      | undefined;
                                    startingWith?:
                                      | (
                                          | (string | number | boolean | null | any)
                                          | (string | number | boolean | null | any)[]
                                        )
                                      | undefined;
                                    endingWith?:
                                      | (
                                          | (string | number | boolean | null | any)
                                          | (string | number | boolean | null | any)[]
                                        )
                                      | undefined;
                                    containing?:
                                      | (
                                          | (string | number | boolean | null | any)
                                          | (string | number | boolean | null | any)[]
                                        )
                                      | undefined;
                                    greaterThan?:
                                      | (
                                          | (string | number | boolean | null | any)
                                          | (string | number | boolean | null | any)[]
                                        )
                                      | undefined;
                                    lessThan?:
                                      | (
                                          | (string | number | boolean | null | any)
                                          | (string | number | boolean | null | any)[]
                                        )
                                      | undefined;
                                  };
                            }
                        )[]
                      | {
                          [x: string]: (
                            | (
                                | (string | number | boolean | null | any)
                                | {
                                    being?:
                                      | (
                                          | (string | number | boolean | null | any)
                                          | (string | number | boolean | null | any)[]
                                        )
                                      | undefined;
                                    notBeing?:
                                      | (
                                          | (string | number | boolean | null | any)
                                          | (string | number | boolean | null | any)[]
                                        )
                                      | undefined;
                                    startingWith?:
                                      | (
                                          | (string | number | boolean | null | any)
                                          | (string | number | boolean | null | any)[]
                                        )
                                      | undefined;
                                    endingWith?:
                                      | (
                                          | (string | number | boolean | null | any)
                                          | (string | number | boolean | null | any)[]
                                        )
                                      | undefined;
                                    containing?:
                                      | (
                                          | (string | number | boolean | null | any)
                                          | (string | number | boolean | null | any)[]
                                        )
                                      | undefined;
                                    greaterThan?:
                                      | (
                                          | (string | number | boolean | null | any)
                                          | (string | number | boolean | null | any)[]
                                        )
                                      | undefined;
                                    lessThan?:
                                      | (
                                          | (string | number | boolean | null | any)
                                          | (string | number | boolean | null | any)[]
                                        )
                                      | undefined;
                                  }
                              )
                            | {
                                [x: string]:
                                  | (string | number | boolean | null | any)
                                  | {
                                      being?:
                                        | (
                                            | (string | number | boolean | null | any)
                                            | (string | number | boolean | null | any)[]
                                          )
                                        | undefined;
                                      notBeing?:
                                        | (
                                            | (string | number | boolean | null | any)
                                            | (string | number | boolean | null | any)[]
                                          )
                                        | undefined;
                                      startingWith?:
                                        | (
                                            | (string | number | boolean | null | any)
                                            | (string | number | boolean | null | any)[]
                                          )
                                        | undefined;
                                      endingWith?:
                                        | (
                                            | (string | number | boolean | null | any)
                                            | (string | number | boolean | null | any)[]
                                          )
                                        | undefined;
                                      containing?:
                                        | (
                                            | (string | number | boolean | null | any)
                                            | (string | number | boolean | null | any)[]
                                          )
                                        | undefined;
                                      greaterThan?:
                                        | (
                                            | (string | number | boolean | null | any)
                                            | (string | number | boolean | null | any)[]
                                          )
                                        | undefined;
                                      lessThan?:
                                        | (
                                            | (string | number | boolean | null | any)
                                            | (string | number | boolean | null | any)[]
                                          )
                                        | undefined;
                                    };
                              }
                          )[];
                        };
                  }
                | {
                    [x: string]:
                      | (
                          | (string | number | boolean | null | any)
                          | {
                              being?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              notBeing?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              startingWith?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              endingWith?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              containing?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              greaterThan?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              lessThan?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                            }
                        )
                      | {
                          [x: string]:
                            | (string | number | boolean | null | any)
                            | {
                                being?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                notBeing?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                startingWith?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                endingWith?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                containing?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                greaterThan?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                lessThan?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                              };
                        }
                      | (
                          | (
                              | (string | number | boolean | null | any)
                              | {
                                  being?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  notBeing?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  startingWith?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  endingWith?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  containing?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  greaterThan?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  lessThan?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                }
                            )
                          | {
                              [x: string]:
                                | (string | number | boolean | null | any)
                                | {
                                    being?:
                                      | (
                                          | (string | number | boolean | null | any)
                                          | (string | number | boolean | null | any)[]
                                        )
                                      | undefined;
                                    notBeing?:
                                      | (
                                          | (string | number | boolean | null | any)
                                          | (string | number | boolean | null | any)[]
                                        )
                                      | undefined;
                                    startingWith?:
                                      | (
                                          | (string | number | boolean | null | any)
                                          | (string | number | boolean | null | any)[]
                                        )
                                      | undefined;
                                    endingWith?:
                                      | (
                                          | (string | number | boolean | null | any)
                                          | (string | number | boolean | null | any)[]
                                        )
                                      | undefined;
                                    containing?:
                                      | (
                                          | (string | number | boolean | null | any)
                                          | (string | number | boolean | null | any)[]
                                        )
                                      | undefined;
                                    greaterThan?:
                                      | (
                                          | (string | number | boolean | null | any)
                                          | (string | number | boolean | null | any)[]
                                        )
                                      | undefined;
                                    lessThan?:
                                      | (
                                          | (string | number | boolean | null | any)
                                          | (string | number | boolean | null | any)[]
                                        )
                                      | undefined;
                                  };
                            }
                        )[]
                      | {
                          [x: string]: (
                            | (
                                | (string | number | boolean | null | any)
                                | {
                                    being?:
                                      | (
                                          | (string | number | boolean | null | any)
                                          | (string | number | boolean | null | any)[]
                                        )
                                      | undefined;
                                    notBeing?:
                                      | (
                                          | (string | number | boolean | null | any)
                                          | (string | number | boolean | null | any)[]
                                        )
                                      | undefined;
                                    startingWith?:
                                      | (
                                          | (string | number | boolean | null | any)
                                          | (string | number | boolean | null | any)[]
                                        )
                                      | undefined;
                                    endingWith?:
                                      | (
                                          | (string | number | boolean | null | any)
                                          | (string | number | boolean | null | any)[]
                                        )
                                      | undefined;
                                    containing?:
                                      | (
                                          | (string | number | boolean | null | any)
                                          | (string | number | boolean | null | any)[]
                                        )
                                      | undefined;
                                    greaterThan?:
                                      | (
                                          | (string | number | boolean | null | any)
                                          | (string | number | boolean | null | any)[]
                                        )
                                      | undefined;
                                    lessThan?:
                                      | (
                                          | (string | number | boolean | null | any)
                                          | (string | number | boolean | null | any)[]
                                        )
                                      | undefined;
                                  }
                              )
                            | {
                                [x: string]:
                                  | (string | number | boolean | null | any)
                                  | {
                                      being?:
                                        | (
                                            | (string | number | boolean | null | any)
                                            | (string | number | boolean | null | any)[]
                                          )
                                        | undefined;
                                      notBeing?:
                                        | (
                                            | (string | number | boolean | null | any)
                                            | (string | number | boolean | null | any)[]
                                          )
                                        | undefined;
                                      startingWith?:
                                        | (
                                            | (string | number | boolean | null | any)
                                            | (string | number | boolean | null | any)[]
                                          )
                                        | undefined;
                                      endingWith?:
                                        | (
                                            | (string | number | boolean | null | any)
                                            | (string | number | boolean | null | any)[]
                                          )
                                        | undefined;
                                      containing?:
                                        | (
                                            | (string | number | boolean | null | any)
                                            | (string | number | boolean | null | any)[]
                                          )
                                        | undefined;
                                      greaterThan?:
                                        | (
                                            | (string | number | boolean | null | any)
                                            | (string | number | boolean | null | any)[]
                                          )
                                        | undefined;
                                      lessThan?:
                                        | (
                                            | (string | number | boolean | null | any)
                                            | (string | number | boolean | null | any)[]
                                          )
                                        | undefined;
                                    };
                              }
                          )[];
                        };
                  }[]
              )
            | undefined;
          to: {
            [x: string]: string | number | boolean | null | any;
          };
          including?: ('all' | string[]) | undefined;
          excluding?: string[] | undefined;
          orderedBy?:
            | (
                | {
                    ascending?: string[] | undefined;
                    descending?: string[] | undefined;
                  }
                | undefined
              )
            | undefined;
          in?: string | undefined;
          before?: (string | null) | undefined;
          after?: (string | null) | undefined;
          limitedTo?: number | undefined;
        };
      }
    | undefined;
};

type QuerySchemaType = {
  [x: string]: {
    with?:
      | (
          | {
              [x: string]:
                | (
                    | (string | number | boolean | null | any)
                    | {
                        being?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        notBeing?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        startingWith?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        endingWith?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        containing?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        greaterThan?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        lessThan?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                      }
                  )
                | {
                    [x: string]:
                      | (string | number | boolean | null | any)
                      | {
                          being?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          notBeing?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          startingWith?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          endingWith?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          containing?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          greaterThan?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          lessThan?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                        };
                  }
                | (
                    | (
                        | (string | number | boolean | null | any)
                        | {
                            being?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            notBeing?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            startingWith?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            endingWith?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            containing?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            greaterThan?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            lessThan?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                          }
                      )
                    | {
                        [x: string]:
                          | (string | number | boolean | null | any)
                          | {
                              being?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              notBeing?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              startingWith?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              endingWith?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              containing?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              greaterThan?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              lessThan?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                            };
                      }
                  )[]
                | {
                    [x: string]: (
                      | (
                          | (string | number | boolean | null | any)
                          | {
                              being?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              notBeing?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              startingWith?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              endingWith?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              containing?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              greaterThan?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              lessThan?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                            }
                        )
                      | {
                          [x: string]:
                            | (string | number | boolean | null | any)
                            | {
                                being?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                notBeing?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                startingWith?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                endingWith?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                containing?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                greaterThan?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                lessThan?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                              };
                        }
                    )[];
                  };
            }
          | {
              [x: string]:
                | (
                    | (string | number | boolean | null | any)
                    | {
                        being?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        notBeing?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        startingWith?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        endingWith?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        containing?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        greaterThan?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        lessThan?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                      }
                  )
                | {
                    [x: string]:
                      | (string | number | boolean | null | any)
                      | {
                          being?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          notBeing?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          startingWith?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          endingWith?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          containing?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          greaterThan?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          lessThan?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                        };
                  }
                | (
                    | (
                        | (string | number | boolean | null | any)
                        | {
                            being?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            notBeing?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            startingWith?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            endingWith?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            containing?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            greaterThan?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            lessThan?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                          }
                      )
                    | {
                        [x: string]:
                          | (string | number | boolean | null | any)
                          | {
                              being?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              notBeing?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              startingWith?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              endingWith?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              containing?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              greaterThan?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              lessThan?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                            };
                      }
                  )[]
                | {
                    [x: string]: (
                      | (
                          | (string | number | boolean | null | any)
                          | {
                              being?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              notBeing?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              startingWith?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              endingWith?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              containing?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              greaterThan?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              lessThan?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                            }
                        )
                      | {
                          [x: string]:
                            | (string | number | boolean | null | any)
                            | {
                                being?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                notBeing?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                startingWith?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                endingWith?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                containing?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                greaterThan?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                lessThan?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                              };
                        }
                    )[];
                  };
            }[]
        )
      | undefined;
    to?:
      | {
          [x: string]: string | number | boolean | null | any;
        }
      | undefined;
    including?: ('all' | string[]) | undefined;
    excluding?: string[] | undefined;
    orderedBy?:
      | (
          | {
              ascending?: string[] | undefined;
              descending?: string[] | undefined;
            }
          | undefined
        )
      | undefined;
    in?: string | undefined;
    before?: (string | null) | undefined;
    after?: (string | null) | undefined;
    limitedTo?: number | undefined;
  };
};

type QueryType = 'get' | 'set' | 'drop' | 'create' | 'count';

type SetInstructions = {
  with?:
    | (
        | {
            [x: string]:
              | (
                  | (string | number | boolean | null | any)
                  | {
                      being?:
                        | (
                            | (string | number | boolean | null | any)
                            | (string | number | boolean | null | any)[]
                          )
                        | undefined;
                      notBeing?:
                        | (
                            | (string | number | boolean | null | any)
                            | (string | number | boolean | null | any)[]
                          )
                        | undefined;
                      startingWith?:
                        | (
                            | (string | number | boolean | null | any)
                            | (string | number | boolean | null | any)[]
                          )
                        | undefined;
                      endingWith?:
                        | (
                            | (string | number | boolean | null | any)
                            | (string | number | boolean | null | any)[]
                          )
                        | undefined;
                      containing?:
                        | (
                            | (string | number | boolean | null | any)
                            | (string | number | boolean | null | any)[]
                          )
                        | undefined;
                      greaterThan?:
                        | (
                            | (string | number | boolean | null | any)
                            | (string | number | boolean | null | any)[]
                          )
                        | undefined;
                      lessThan?:
                        | (
                            | (string | number | boolean | null | any)
                            | (string | number | boolean | null | any)[]
                          )
                        | undefined;
                    }
                )
              | {
                  [x: string]:
                    | (string | number | boolean | null | any)
                    | {
                        being?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        notBeing?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        startingWith?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        endingWith?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        containing?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        greaterThan?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        lessThan?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                      };
                }
              | (
                  | (
                      | (string | number | boolean | null | any)
                      | {
                          being?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          notBeing?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          startingWith?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          endingWith?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          containing?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          greaterThan?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          lessThan?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                        }
                    )
                  | {
                      [x: string]:
                        | (string | number | boolean | null | any)
                        | {
                            being?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            notBeing?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            startingWith?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            endingWith?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            containing?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            greaterThan?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            lessThan?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                          };
                    }
                )[]
              | {
                  [x: string]: (
                    | (
                        | (string | number | boolean | null | any)
                        | {
                            being?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            notBeing?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            startingWith?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            endingWith?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            containing?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            greaterThan?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            lessThan?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                          }
                      )
                    | {
                        [x: string]:
                          | (string | number | boolean | null | any)
                          | {
                              being?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              notBeing?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              startingWith?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              endingWith?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              containing?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              greaterThan?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              lessThan?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                            };
                      }
                  )[];
                };
          }
        | {
            [x: string]:
              | (
                  | (string | number | boolean | null | any)
                  | {
                      being?:
                        | (
                            | (string | number | boolean | null | any)
                            | (string | number | boolean | null | any)[]
                          )
                        | undefined;
                      notBeing?:
                        | (
                            | (string | number | boolean | null | any)
                            | (string | number | boolean | null | any)[]
                          )
                        | undefined;
                      startingWith?:
                        | (
                            | (string | number | boolean | null | any)
                            | (string | number | boolean | null | any)[]
                          )
                        | undefined;
                      endingWith?:
                        | (
                            | (string | number | boolean | null | any)
                            | (string | number | boolean | null | any)[]
                          )
                        | undefined;
                      containing?:
                        | (
                            | (string | number | boolean | null | any)
                            | (string | number | boolean | null | any)[]
                          )
                        | undefined;
                      greaterThan?:
                        | (
                            | (string | number | boolean | null | any)
                            | (string | number | boolean | null | any)[]
                          )
                        | undefined;
                      lessThan?:
                        | (
                            | (string | number | boolean | null | any)
                            | (string | number | boolean | null | any)[]
                          )
                        | undefined;
                    }
                )
              | {
                  [x: string]:
                    | (string | number | boolean | null | any)
                    | {
                        being?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        notBeing?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        startingWith?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        endingWith?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        containing?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        greaterThan?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                        lessThan?:
                          | (
                              | (string | number | boolean | null | any)
                              | (string | number | boolean | null | any)[]
                            )
                          | undefined;
                      };
                }
              | (
                  | (
                      | (string | number | boolean | null | any)
                      | {
                          being?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          notBeing?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          startingWith?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          endingWith?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          containing?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          greaterThan?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          lessThan?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                        }
                    )
                  | {
                      [x: string]:
                        | (string | number | boolean | null | any)
                        | {
                            being?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            notBeing?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            startingWith?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            endingWith?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            containing?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            greaterThan?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            lessThan?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                          };
                    }
                )[]
              | {
                  [x: string]: (
                    | (
                        | (string | number | boolean | null | any)
                        | {
                            being?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            notBeing?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            startingWith?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            endingWith?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            containing?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            greaterThan?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            lessThan?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                          }
                      )
                    | {
                        [x: string]:
                          | (string | number | boolean | null | any)
                          | {
                              being?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              notBeing?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              startingWith?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              endingWith?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              containing?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              greaterThan?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              lessThan?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                            };
                      }
                  )[];
                };
          }[]
      )
    | undefined;
  to: {
    [x: string]: string | number | boolean | null | any;
  };
  including?: ('all' | string[]) | undefined;
  excluding?: string[] | undefined;
  orderedBy?:
    | (
        | {
            ascending?: string[] | undefined;
            descending?: string[] | undefined;
          }
        | undefined
      )
    | undefined;
  in?: string | undefined;
  before?: (string | null) | undefined;
  after?: (string | null) | undefined;
  limitedTo?: number | undefined;
};

type SetQuery = {
  set: {
    [x: string]: {
      with?:
        | (
            | {
                [x: string]:
                  | (
                      | (string | number | boolean | null | any)
                      | {
                          being?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          notBeing?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          startingWith?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          endingWith?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          containing?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          greaterThan?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          lessThan?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                        }
                    )
                  | {
                      [x: string]:
                        | (string | number | boolean | null | any)
                        | {
                            being?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            notBeing?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            startingWith?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            endingWith?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            containing?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            greaterThan?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            lessThan?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                          };
                    }
                  | (
                      | (
                          | (string | number | boolean | null | any)
                          | {
                              being?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              notBeing?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              startingWith?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              endingWith?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              containing?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              greaterThan?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              lessThan?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                            }
                        )
                      | {
                          [x: string]:
                            | (string | number | boolean | null | any)
                            | {
                                being?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                notBeing?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                startingWith?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                endingWith?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                containing?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                greaterThan?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                lessThan?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                              };
                        }
                    )[]
                  | {
                      [x: string]: (
                        | (
                            | (string | number | boolean | null | any)
                            | {
                                being?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                notBeing?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                startingWith?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                endingWith?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                containing?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                greaterThan?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                lessThan?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                              }
                          )
                        | {
                            [x: string]:
                              | (string | number | boolean | null | any)
                              | {
                                  being?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  notBeing?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  startingWith?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  endingWith?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  containing?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  greaterThan?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  lessThan?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                };
                          }
                      )[];
                    };
              }
            | {
                [x: string]:
                  | (
                      | (string | number | boolean | null | any)
                      | {
                          being?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          notBeing?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          startingWith?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          endingWith?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          containing?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          greaterThan?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                          lessThan?:
                            | (
                                | (string | number | boolean | null | any)
                                | (string | number | boolean | null | any)[]
                              )
                            | undefined;
                        }
                    )
                  | {
                      [x: string]:
                        | (string | number | boolean | null | any)
                        | {
                            being?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            notBeing?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            startingWith?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            endingWith?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            containing?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            greaterThan?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                            lessThan?:
                              | (
                                  | (string | number | boolean | null | any)
                                  | (string | number | boolean | null | any)[]
                                )
                              | undefined;
                          };
                    }
                  | (
                      | (
                          | (string | number | boolean | null | any)
                          | {
                              being?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              notBeing?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              startingWith?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              endingWith?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              containing?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              greaterThan?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                              lessThan?:
                                | (
                                    | (string | number | boolean | null | any)
                                    | (string | number | boolean | null | any)[]
                                  )
                                | undefined;
                            }
                        )
                      | {
                          [x: string]:
                            | (string | number | boolean | null | any)
                            | {
                                being?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                notBeing?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                startingWith?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                endingWith?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                containing?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                greaterThan?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                lessThan?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                              };
                        }
                    )[]
                  | {
                      [x: string]: (
                        | (
                            | (string | number | boolean | null | any)
                            | {
                                being?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                notBeing?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                startingWith?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                endingWith?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                containing?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                greaterThan?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                                lessThan?:
                                  | (
                                      | (string | number | boolean | null | any)
                                      | (string | number | boolean | null | any)[]
                                    )
                                  | undefined;
                              }
                          )
                        | {
                            [x: string]:
                              | (string | number | boolean | null | any)
                              | {
                                  being?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  notBeing?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  startingWith?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  endingWith?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  containing?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  greaterThan?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                  lessThan?:
                                    | (
                                        | (string | number | boolean | null | any)
                                        | (string | number | boolean | null | any)[]
                                      )
                                    | undefined;
                                };
                          }
                      )[];
                    };
              }[]
          )
        | undefined;
      to: {
        [x: string]: string | number | boolean | null | any;
      };
      including?: ('all' | string[]) | undefined;
      excluding?: string[] | undefined;
      orderedBy?:
        | (
            | {
                ascending?: string[] | undefined;
                descending?: string[] | undefined;
              }
            | undefined
          )
        | undefined;
      in?: string | undefined;
      before?: (string | null) | undefined;
      after?: (string | null) | undefined;
      limitedTo?: number | undefined;
    };
  };
};

type WithInstruction = {
  [x: string]:
    | (
        | (string | number | boolean | null | any)
        | {
            being?:
              | ((string | number | boolean | null | any) | (string | number | boolean | null | any)[])
              | undefined;
            notBeing?:
              | ((string | number | boolean | null | any) | (string | number | boolean | null | any)[])
              | undefined;
            startingWith?:
              | ((string | number | boolean | null | any) | (string | number | boolean | null | any)[])
              | undefined;
            endingWith?:
              | ((string | number | boolean | null | any) | (string | number | boolean | null | any)[])
              | undefined;
            containing?:
              | ((string | number | boolean | null | any) | (string | number | boolean | null | any)[])
              | undefined;
            greaterThan?:
              | ((string | number | boolean | null | any) | (string | number | boolean | null | any)[])
              | undefined;
            lessThan?:
              | ((string | number | boolean | null | any) | (string | number | boolean | null | any)[])
              | undefined;
          }
      )
    | {
        [x: string]:
          | (string | number | boolean | null | any)
          | {
              being?:
                | ((string | number | boolean | null | any) | (string | number | boolean | null | any)[])
                | undefined;
              notBeing?:
                | ((string | number | boolean | null | any) | (string | number | boolean | null | any)[])
                | undefined;
              startingWith?:
                | ((string | number | boolean | null | any) | (string | number | boolean | null | any)[])
                | undefined;
              endingWith?:
                | ((string | number | boolean | null | any) | (string | number | boolean | null | any)[])
                | undefined;
              containing?:
                | ((string | number | boolean | null | any) | (string | number | boolean | null | any)[])
                | undefined;
              greaterThan?:
                | ((string | number | boolean | null | any) | (string | number | boolean | null | any)[])
                | undefined;
              lessThan?:
                | ((string | number | boolean | null | any) | (string | number | boolean | null | any)[])
                | undefined;
            };
      }
    | (
        | (
            | (string | number | boolean | null | any)
            | {
                being?:
                  | ((string | number | boolean | null | any) | (string | number | boolean | null | any)[])
                  | undefined;
                notBeing?:
                  | ((string | number | boolean | null | any) | (string | number | boolean | null | any)[])
                  | undefined;
                startingWith?:
                  | ((string | number | boolean | null | any) | (string | number | boolean | null | any)[])
                  | undefined;
                endingWith?:
                  | ((string | number | boolean | null | any) | (string | number | boolean | null | any)[])
                  | undefined;
                containing?:
                  | ((string | number | boolean | null | any) | (string | number | boolean | null | any)[])
                  | undefined;
                greaterThan?:
                  | ((string | number | boolean | null | any) | (string | number | boolean | null | any)[])
                  | undefined;
                lessThan?:
                  | ((string | number | boolean | null | any) | (string | number | boolean | null | any)[])
                  | undefined;
              }
          )
        | {
            [x: string]:
              | (string | number | boolean | null | any)
              | {
                  being?:
                    | ((string | number | boolean | null | any) | (string | number | boolean | null | any)[])
                    | undefined;
                  notBeing?:
                    | ((string | number | boolean | null | any) | (string | number | boolean | null | any)[])
                    | undefined;
                  startingWith?:
                    | ((string | number | boolean | null | any) | (string | number | boolean | null | any)[])
                    | undefined;
                  endingWith?:
                    | ((string | number | boolean | null | any) | (string | number | boolean | null | any)[])
                    | undefined;
                  containing?:
                    | ((string | number | boolean | null | any) | (string | number | boolean | null | any)[])
                    | undefined;
                  greaterThan?:
                    | ((string | number | boolean | null | any) | (string | number | boolean | null | any)[])
                    | undefined;
                  lessThan?:
                    | ((string | number | boolean | null | any) | (string | number | boolean | null | any)[])
                    | undefined;
                };
          }
      )[]
    | {
        [x: string]: (
          | (
              | (string | number | boolean | null | any)
              | {
                  being?:
                    | ((string | number | boolean | null | any) | (string | number | boolean | null | any)[])
                    | undefined;
                  notBeing?:
                    | ((string | number | boolean | null | any) | (string | number | boolean | null | any)[])
                    | undefined;
                  startingWith?:
                    | ((string | number | boolean | null | any) | (string | number | boolean | null | any)[])
                    | undefined;
                  endingWith?:
                    | ((string | number | boolean | null | any) | (string | number | boolean | null | any)[])
                    | undefined;
                  containing?:
                    | ((string | number | boolean | null | any) | (string | number | boolean | null | any)[])
                    | undefined;
                  greaterThan?:
                    | ((string | number | boolean | null | any) | (string | number | boolean | null | any)[])
                    | undefined;
                  lessThan?:
                    | ((string | number | boolean | null | any) | (string | number | boolean | null | any)[])
                    | undefined;
                }
            )
          | {
              [x: string]:
                | (string | number | boolean | null | any)
                | {
                    being?:
                      | (
                          | (string | number | boolean | null | any)
                          | (string | number | boolean | null | any)[]
                        )
                      | undefined;
                    notBeing?:
                      | (
                          | (string | number | boolean | null | any)
                          | (string | number | boolean | null | any)[]
                        )
                      | undefined;
                    startingWith?:
                      | (
                          | (string | number | boolean | null | any)
                          | (string | number | boolean | null | any)[]
                        )
                      | undefined;
                    endingWith?:
                      | (
                          | (string | number | boolean | null | any)
                          | (string | number | boolean | null | any)[]
                        )
                      | undefined;
                    containing?:
                      | (
                          | (string | number | boolean | null | any)
                          | (string | number | boolean | null | any)[]
                        )
                      | undefined;
                    greaterThan?:
                      | (
                          | (string | number | boolean | null | any)
                          | (string | number | boolean | null | any)[]
                        )
                      | undefined;
                    lessThan?:
                      | (
                          | (string | number | boolean | null | any)
                          | (string | number | boolean | null | any)[]
                        )
                      | undefined;
                  };
            }
        )[];
      };
};

/**
 * Utility type that merges extra properties `R` into each element of array-type
 * properties in a type `T`; non-array properties are left unchanged.
 */
type BindToArray<T, R> = {
  [K in keyof T]: T[K] extends Array<infer U> ? Array<U> & R : T[K];
};
/**
 * Utility type used to type the results of a query.
 *
 * It unwraps the promised type if `T` is an array of Promises, adds `moreBefore?`
 * and `moreAfter?` fields to an array's items if `T` is an array. Otherwise it
 * wraps non-array and non-Promise types in an array.
 */
type Results<T> = T extends never | Array<never>
  ? T
  : T extends []
    ? []
    : T extends [infer First, ...infer Rest]
      ? Rest extends unknown
        ? First extends Promise<infer U>
          ? [U]
          : BindToArray<[First, ...Rest], QueryPaginationOptions>
        : Array<First>
      : T extends Promise<infer U>
        ? [U]
        : [T];

export type {
  CombinedInstructions,
  CountInstructions,
  CountQuery,
  CreateInstructions,
  CreateQuery,
  DropInstructions,
  DropQuery,
  GetInstructions,
  GetQuery,
  IncludingInstruction,
  Instruction,
  Instructions,
  OrderedByInstruction,
  Query,
  QueryInstructionType,
  QueryPaginationOptions,
  QuerySchemaType,
  QueryType,
  SetInstructions,
  SetQuery,
  WithInstruction,
  BindToArray,
  Results,
};

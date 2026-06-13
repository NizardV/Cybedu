package com.masiloic.cybedu.domain.models

data class User (
    val id: Int,
    val username: String,
    val email: String
)

val usersMock = listOf(
    User(1, "louis_mrt", "louis.martin@example.com"),
    User(2, "emma_ldr", "emma.lefevre@example.com"),
    User(3, "nathan_blc", "nathan.blanc@example.com"),
    User(4, "lea_dup", "lea.dupont@example.com"),
    User(5, "hugo_frr", "hugo.ferrand@example.com"),
    User(6, "chloe_grt", "chloe.garret@example.com"),
    User(7, "arthur_mrn", "arthur.morin@example.com"),
    User(8, "jade_prt", "jade.perret@example.com"),
    User(9, "maxime_cst", "maxime.coste@example.com"),
    User(10, "ines_glt", "ines.gallet@example.com"),
    User(11, "theo_brn", "theo.brun@example.com"),
    User(12, "manon_cmr", "manon.camier@example.com"),
    User(13, "enzo_drt", "enzo.durand@example.com"),
    User(14, "julie_mrs", "julie.mares@example.com"),
    User(15, "paul_tlr", "paul.teller@example.com"),
    User(16, "anaelle_prx", "anaelle.peroux@example.com"),
    User(17, "quentin_lsc", "quentin.lesac@example.com"),
    User(18, "amelie_vnc", "amelie.vincourt@example.com"),
    User(19, "valentin_sch", "valentin.schmitt@example.com"),
    User(20, "noemie_hbr", "noemie.hubert@example.com")
)

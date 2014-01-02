name := "aal"

version := "1.0-SNAPSHOT"

libraryDependencies ++= Seq(
  javaJdbc,
  javaEbean,
  cache
)

libraryDependencies += "postgresql" % "postgresql" % "9.1-901.jdbc4"

libraryDependencies += "org.hibernate" % "hibernate-entitymanager" % "3.6.9.Final"

playAssetsDirectories <+= baseDirectory / "angular"

play.Project.playJavaSettings

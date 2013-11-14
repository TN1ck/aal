name := "aal"

version := "1.0-SNAPSHOT"

libraryDependencies ++= Seq(
  javaJdbc,
  javaEbean,
  cache
)     

playAssetsDirectories <+= baseDirectory / "angular"

play.Project.playJavaSettings
